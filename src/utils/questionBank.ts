import { Question } from '../types';
import { getAdminQuestions } from './adminStorage';

const blockchainQuestions: Question[] = [
  {
    id: 1,
    question: "What is a blockchain?",
    options: [
      "A type of cryptocurrency",
      "A distributed ledger technology",
      "A programming language",
      "A database management system"
    ],
    correctAnswer: 1,
    explanation: "Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography."
  },
  {
    id: 2,
    question: "Who is credited with creating Bitcoin?",
    options: [
      "Vitalik Buterin",
      "Satoshi Nakamoto",
      "Nick Szabo",
      "Hal Finney"
    ],
    correctAnswer: 1,
    explanation: "Satoshi Nakamoto is the pseudonymous person or group who created Bitcoin and authored the original Bitcoin whitepaper."
  },
  {
    id: 3,
    question: "What is the primary purpose of mining in blockchain?",
    options: [
      "To create new cryptocurrencies",
      "To validate transactions and secure the network",
      "To store data",
      "To create smart contracts"
    ],
    correctAnswer: 1,
    explanation: "Mining is the process of validating transactions and adding them to the blockchain while securing the network through computational work."
  },
  {
    id: 4,
    question: "What is a smart contract?",
    options: [
      "A legal document stored digitally",
      "A self-executing contract with terms directly written into code",
      "A contract between miners",
      "A cryptocurrency exchange agreement"
    ],
    correctAnswer: 1,
    explanation: "Smart contracts are self-executing contracts with the terms of the agreement directly written into lines of code, which automatically execute when predetermined conditions are met."
  },
  {
    id: 5,
    question: "Which consensus mechanism does Bitcoin use?",
    options: [
      "Proof of Stake",
      "Proof of Work",
      "Delegated Proof of Stake",
      "Proof of Authority"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin uses Proof of Work (PoW) consensus mechanism, where miners compete to solve cryptographic puzzles to validate transactions and create new blocks."
  },
  {
    id: 6,
    question: "What is a hash function in blockchain?",
    options: [
      "A function that encrypts data",
      "A function that creates a fixed-size output from variable input",
      "A function that validates transactions",
      "A function that creates new blocks"
    ],
    correctAnswer: 1,
    explanation: "A hash function takes an input of any size and produces a fixed-size string of characters, which appears random and is used for data integrity and security in blockchain."
  },
  {
    id: 7,
    question: "What is the maximum supply of Bitcoin?",
    options: [
      "18 million",
      "21 million",
      "25 million",
      "Unlimited"
    ],
    correctAnswer: 1,
    explanation: "Bitcoin has a maximum supply cap of 21 million coins, which is built into the protocol and cannot be changed."
  },
  {
    id: 8,
    question: "What is a private key in blockchain?",
    options: [
      "A public identifier for your wallet",
      "A secret key used to authorize transactions",
      "A password for blockchain networks",
      "A key used by miners"
    ],
    correctAnswer: 1,
    explanation: "A private key is a secret cryptographic key that allows the holder to access and spend the cryptocurrency associated with a specific address."
  },
  {
    id: 9,
    question: "What is decentralization in blockchain?",
    options: [
      "Storing data in one central location",
      "Distributing control across multiple nodes",
      "Using only one computer to run the network",
      "Having a single administrator"
    ],
    correctAnswer: 1,
    explanation: "Decentralization means distributing control and decision-making across multiple nodes rather than having a single central authority."
  },
  {
    id: 10,
    question: "What is a fork in blockchain?",
    options: [
      "A physical tool used in mining",
      "A change to the blockchain protocol rules",
      "A type of cryptocurrency",
      "A method of storing data"
    ],
    correctAnswer: 1,
    explanation: "A fork is a change to the blockchain protocol rules, which can be either a soft fork (backward compatible) or hard fork (not backward compatible)."
  },
  {
    id: 11,
    question: "What is the purpose of a nonce in blockchain?",
    options: [
      "To encrypt transactions",
      "A number used once in cryptographic hashing",
      "To identify unique users",
      "To store transaction data"
    ],
    correctAnswer: 1,
    explanation: "A nonce (number used once) is a value used in mining to vary the hash output and find a hash that meets the network's difficulty requirement."
  },
  {
    id: 12,
    question: "What is Ethereum's native cryptocurrency called?",
    options: [
      "Bitcoin",
      "Ether (ETH)",
      "Litecoin",
      "Ripple"
    ],
    correctAnswer: 1,
    explanation: "Ether (ETH) is the native cryptocurrency of the Ethereum blockchain platform."
  },
  {
    id: 13,
    question: "What is a Merkle Tree in blockchain?",
    options: [
      "A type of cryptocurrency",
      "A binary tree structure for efficient transaction verification",
      "A mining algorithm",
      "A wallet type"
    ],
    correctAnswer: 1,
    explanation: "A Merkle Tree is a binary tree structure that allows for efficient and secure verification of large data structures, used in blockchain to verify transactions in a block."
  },
  {
    id: 14,
    question: "What is gas in Ethereum?",
    options: [
      "A type of cryptocurrency",
      "A unit of measurement for computational work",
      "A mining hardware",
      "A wallet feature"
    ],
    correctAnswer: 1,
    explanation: "Gas is the unit used to measure the computational effort required to execute operations on the Ethereum network."
  },
  {
    id: 15,
    question: "What is a 51% attack?",
    options: [
      "When 51% of users leave the network",
      "When someone controls majority of network's mining power",
      "When 51% of transactions fail",
      "When 51% of nodes go offline"
    ],
    correctAnswer: 1,
    explanation: "A 51% attack occurs when a single entity or group controls more than 50% of the network's mining hash rate, potentially allowing them to manipulate transactions."
  }
];

export const getRandomQuestions = (count: number): Question[] => {
  // First try to get questions from admin storage
  const adminQuestions = getAdminQuestions();
  
  // Convert admin questions to regular questions format
  const convertedAdminQuestions: Question[] = adminQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation
  }));
  
  // Use admin questions if available, otherwise fall back to default questions
  const questionsToUse = convertedAdminQuestions.length > 0 ? convertedAdminQuestions : blockchainQuestions;
  
  const shuffled = [...questionsToUse].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questionsToUse.length));
};

export { blockchainQuestions };