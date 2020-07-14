import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const trans = this.transactions;

    const income = trans.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);

    const outcome = trans.reduce((acc, transaction) => {
      if (transaction.type === 'outcome') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
