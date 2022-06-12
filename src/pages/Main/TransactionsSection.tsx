import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API_ROOT, fetchTransactions } from '../../api/lib';
import Chip from '../../components/Chip';
import { Heading } from '../../components/Heading';
import { Tag, Transaction } from '../../types';
import { media } from '../../utils/media';

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null)

  useEffect(() => {
    async function fetch() {
      const response = await fetchTransactions()

      if (response !== null) {
        setTransactions(response)
      }
    }

    fetch()
  }, [])

  return (
    <MainContainer className='card'>

      <TopSection>
        <Heading>Recent Transactions</Heading>


        <a>
          <h4 className='alert'>See All</h4>
        </a>
      </TopSection>

      {transactions ? (
        <RecentTransactionsList transactions={transactions} />
      ) : (null)}

    </MainContainer>
  );
}

function sortTransactionsByDateDesc(transactionA: Transaction, transactionB: Transaction) {
  return new Date(transactionB.dateTime).getTime() - new Date(transactionA.dateTime).getTime()
}

type RecentTransactionsListProps = { transactions: Transaction[] }
function RecentTransactionsList(props: RecentTransactionsListProps) {
  return (
    <>
      {props.transactions.sort(sortTransactionsByDateDesc).map(transaction => (
        <RecentTransactionItem transaction={transaction} />
      ))}
    </>
  )
}

type RecentTransactionItemProps = { transaction: Transaction }
function RecentTransactionItem(props: RecentTransactionItemProps) {
  const [tags, setTags] = useState<Tag[] | null>(null)

  useEffect(() => {
    async function fetch(tagId: string): Promise<Tag> {
      const response = await axios.get(`${API_ROOT}/api/Tag/${tagId}`)
      return response.data
    }

    async function fetchAll() {
      const tags: Tag[] = []
      for (const tagId of props.transaction.tagIds) {
        const tag = await fetch(tagId)
        tags.push(tag)
      }

      setTags(tags)
    }

    fetchAll()
  })


  return (

    <TransactionItemContainer>

      <TransactionItem>

        <h6 className="description">{props.transaction.description}</h6>

        {tags ? (
          tags.map(tag => (
            <Chip key={tag.id} label={tag.name} />
          ))
        ) : (null)}

        <h6 className="datetime">{`${new Date(props.transaction.dateTime).toLocaleDateString()}`}</h6>

        <h6 className="price">{`${props.transaction.transactionType === "Credit" ? `$${props.transaction.amount}` : `-$${props.transaction.amount}`}`}</h6>




      </TransactionItem>
      <Divider />
    </TransactionItemContainer>
  )
}

const TransactionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Divider = styled.div`
width: 100%;
height: 0.2px;
background-color: rgba(174, 174, 174, 0.6);
`

const TransactionItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h6 {
    font-size: 1.2rem;
  }

  h6.datetime {
    color: rgba(174, 174, 174, 1);
    font-weight: bold;
  }
`

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  h4.alert {
    font-size: 1.4rem;
    font-weight: bold;
  }

  ${media('<tablet')} {
    flex-direction: column;
  }
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 400px;
  height: 80%;
  padding: 4rem 2rem;

  overflow-y: hidden;

  border-radius: 2rem;

  margin-top: 2rem;
  margin-bottom: 2rem;

  ${media('<desktop')} {
    height: 450px;
  }

  ${media('<tablet')} {
    width: 100%;
    min-height: 300px;
  }
`




