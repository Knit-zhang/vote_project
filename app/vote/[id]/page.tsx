'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function VoteDetailPage() {
  const { id } = useParams();
  const { address } = useAccount();
  const [voteDetails, setVoteDetails] = useState(null);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    // Fetch vote details based on the id
    // This is a placeholder. In a real app, you'd fetch this data from your backend or blockchain
    setVoteDetails({
      id,
      title: `Vote ${id}`,
      description: 'This is a sample vote description.',
      options: ['Option 1', 'Option 2', 'Option 3'],
      results: [30, 45, 25],
    });
  }, [id]);

  const handleVote = (optionIndex) => {
    // Here you would send the vote to your smart contract
    console.log(`Voting for option ${optionIndex}`);
    setUserVote(optionIndex);
  };

  if (!voteDetails) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 mt-16"
    >
      <Card>
        <CardHeader>
          <CardTitle>{voteDetails.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{voteDetails.description}</p>
          <h3 className="text-xl font-semibold mb-2">Options:</h3>
          <ul className="list-disc pl-5 mb-4">
            {voteDetails.options.map((option, index) => (
              <li key={index} className="mb-2">
                {option}
                {address && !userVote && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleVote(index)}
                  >
                    Vote
                  </Button>
                )}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mb-2">Results:</h3>
          <div className="space-y-2">
            {voteDetails.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <span className="w-24">{option}:</span>
                <motion.div
                  className="bg-blue-500 h-4 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${voteDetails.results[index]}%` }}
                  transition={{ duration: 1 }}
                />
                <span className="ml-2">{voteDetails.results[index]}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}