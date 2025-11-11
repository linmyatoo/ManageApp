import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase'

function App() {
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [showTransferForm, setShowTransferForm] = useState(false)
  const [amount, setAmount] = useState('')
  const [bank, setBank] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [incomeData, setIncomeData] = useState([])
  const [transferData, setTransferData] = useState([])
  const [loading, setLoading] = useState(true)

  // Load income data from Firestore
  useEffect(() => {
    const loadIncomeData = async () => {
      try {
        const q = query(collection(db, 'income'), orderBy('timestamp', 'desc'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setIncomeData(data)
      } catch (error) {
        console.error('Error loading income data:', error)
      }
    }
    loadIncomeData()
  }, [])

  // Load transfer data from Firestore
  useEffect(() => {
    const loadTransferData = async () => {
      try {
        const q = query(collection(db, 'transfers'), orderBy('timestamp', 'desc'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTransferData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error loading transfer data:', error)
        setLoading(false)
      }
    }
    loadTransferData()
  }, [])

  const bankOptions = [
    'BB Bangkok Bank',
    'BB SCB',
    'BB Kplus',
    'BB KTB',
    'LMO Bangkok Bank',
    'LMO SCB'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newIncome = {
        amount: parseFloat(amount),
        bank: bank,
        date: new Date().toLocaleDateString('en-GB'),
        timestamp: Date.now()
      }
      const docRef = await addDoc(collection(db, 'income'), newIncome)
      setIncomeData([{ id: docRef.id, ...newIncome }, ...incomeData])
      console.log('Income submitted:', { amount, bank })
      // Reset form
      setAmount('')
      setBank('')
    } catch (error) {
      console.error('Error adding income:', error)
      alert('Failed to save income. Please try again.')
    }
  }

  const handleTransferSubmit = async (e) => {
    e.preventDefault()
    try {
      const newTransfer = {
        amount: parseFloat(transferAmount),
        date: new Date().toLocaleDateString('en-GB'),
        timestamp: Date.now()
      }
      const docRef = await addDoc(collection(db, 'transfers'), newTransfer)
      setTransferData([{ id: docRef.id, ...newTransfer }, ...transferData])
      console.log('Transfer submitted:', { amount: transferAmount })
      // Reset form
      setTransferAmount('')
    } catch (error) {
      console.error('Error adding transfer:', error)
      alert('Failed to save transfer. Please try again.')
    }
  }

  const handleDeleteIncome = async (id) => {
    if (window.confirm('Are you sure you want to delete this income entry?')) {
      try {
        await deleteDoc(doc(db, 'income', id))
        setIncomeData(incomeData.filter(income => income.id !== id))
      } catch (error) {
        console.error('Error deleting income:', error)
        alert('Failed to delete income. Please try again.')
      }
    }
  }

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all income data?')) {
      try {
        const querySnapshot = await getDocs(collection(db, 'income'))
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
        await Promise.all(deletePromises)
        setIncomeData([])
      } catch (error) {
        console.error('Error deleting all income:', error)
        alert('Failed to delete all income. Please try again.')
      }
    }
  }

  const handleDeleteTransfer = async (id) => {
    if (window.confirm('Are you sure you want to delete this transfer entry?')) {
      try {
        await deleteDoc(doc(db, 'transfers', id))
        setTransferData(transferData.filter(transfer => transfer.id !== id))
      } catch (error) {
        console.error('Error deleting transfer:', error)
        alert('Failed to delete transfer. Please try again.')
      }
    }
  }

  const handleDeleteAllTransfers = async () => {
    if (window.confirm('Are you sure you want to delete all transfer data?')) {
      try {
        const querySnapshot = await getDocs(collection(db, 'transfers'))
        const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
        await Promise.all(deletePromises)
        setTransferData([])
      } catch (error) {
        console.error('Error deleting all transfers:', error)
        alert('Failed to delete all transfers. Please try again.')
      }
    }
  }

  // Group income data by bank
  const groupedByBank = incomeData.reduce((acc, income) => {
    if (!acc[income.bank]) {
      acc[income.bank] = []
    }
    acc[income.bank].push(income)
    return acc
  }, {})

  // Calculate totals
  const bankTotals = Object.keys(groupedByBank).map(bank => ({
    bank,
    total: groupedByBank[bank].reduce((sum, item) => sum + item.amount, 0)
  }))

  const grandTotal = incomeData.reduce((sum, item) => sum + item.amount, 0)

  const transferGrandTotal = transferData.reduce((sum, item) => sum + item.amount, 0)

  const finalBalance = grandTotal - transferGrandTotal

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading your data...</div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <h1>Manage App</h1>
      
      <div className="button-group">
        <button 
          className="income-button" 
          onClick={() => {
            setShowIncomeForm(!showIncomeForm)
            setShowTransferForm(false)
          }}
        >
          {showIncomeForm ? 'Hide Income Form' : 'Income'}
        </button>

        <button 
          className="transfer-button" 
          onClick={() => {
            setShowTransferForm(!showTransferForm)
            setShowIncomeForm(false)
          }}
        >
          {showTransferForm ? 'Hide Transfer Form' : 'Transfer'}
        </button>
      </div>

      {showIncomeForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bank">Bank:</label>
            <select
              id="bank"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              required
            >
              <option value="">Select a bank</option>
              {bankOptions.map((bankOption) => (
                <option key={bankOption} value={bankOption}>
                  {bankOption}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {showTransferForm && (
        <form onSubmit={handleTransferSubmit}>
          <div className="form-group">
            <label htmlFor="transferAmount">Amount:</label>
            <input
              type="number"
              id="transferAmount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {incomeData.length > 0 && (
        <div className="income-table-container">
          <div className="table-header">
            <h2>Income Summary</h2>
            <button className="delete-all-button" onClick={handleDeleteAll}>
              Delete All
            </button>
          </div>
          <table className="income-table">
            <thead>
              <tr>
                <th>Bank</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bankTotals.map((bankTotal) => (
                <>
                  {groupedByBank[bankTotal.bank].map((income, index) => (
                    <tr key={income.id}>
                      {index === 0 && (
                        <td rowSpan={groupedByBank[bankTotal.bank].length}>
                          {bankTotal.bank}
                        </td>
                      )}
                      <td>{income.date}</td>
                      <td>{income.amount.toLocaleString()}</td>
                      {index === 0 && (
                        <td rowSpan={groupedByBank[bankTotal.bank].length} className="bank-total">
                          {bankTotal.total.toLocaleString()}
                        </td>
                      )}
                      <td>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteIncome(income.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
              <tr className="grand-total-row">
                <td colSpan="4"><strong>Grand Total</strong></td>
                <td><strong>{grandTotal.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {transferData.length > 0 && (
        <div className="income-table-container">
          <div className="table-header">
            <h2>Transfer Summary</h2>
            <button className="delete-all-button" onClick={handleDeleteAllTransfers}>
              Delete All
            </button>
          </div>
          <table className="income-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transferData.map((transfer) => (
                <tr key={transfer.id}>
                  <td>{transfer.date}</td>
                  <td>{transfer.amount.toLocaleString()}</td>
                  <td>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteTransfer(transfer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="grand-total-row">
                <td><strong>Grand Total</strong></td>
                <td colSpan="2"><strong>{transferGrandTotal.toLocaleString()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {(incomeData.length > 0 || transferData.length > 0) && (
        <div className="balance-container">
          <h2>Final Balance</h2>
          <div className="balance-summary">
            <div className="balance-item">
              <span className="balance-label">Total Income:</span>
              <span className="balance-amount income">{grandTotal.toLocaleString()}</span>
            </div>
            <div className="balance-item">
              <span className="balance-label">Total Transfer:</span>
              <span className="balance-amount transfer">-{transferGrandTotal.toLocaleString()}</span>
            </div>
            <div className="balance-item final">
              <span className="balance-label">Balance:</span>
              <span className={`balance-amount ${finalBalance >= 0 ? 'positive' : 'negative'}`}>
                {finalBalance.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
