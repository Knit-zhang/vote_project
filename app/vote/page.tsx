'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function VotePage() {
  const { address } = useAccount();
  const [votes, setVotes] = useState([
    { id: 1, title: 'Best Programming Language', status: 'active' },
    { id: 2, title: 'Favorite Web Framework', status: 'ended' },
    { id: 3, title: 'Most Promising Blockchain', status: 'active' },
  ]);

  const [newVote, setNewVote] = useState({ title: '', description: '', options: ['', ''] });

  const handleCreateVote = () => {
    // Here you would typically send this data to your backend or smart contract
    console.log('Creating new vote:', newVote);
    // For demo purposes, we'll just add it to the local state
    setVotes([...votes, { id: votes.length + 1, title: newVote.title, status: 'active' }]);
    setNewVote({ title: '', description: '', options: ['', ''] });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 mt-16"
    >
      <h1 className="text-4xl font-bold mb-8">Votes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {votes.map((vote, index) => (
          <motion.div
            key={vote.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{vote.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`mb-4 ${vote.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  Status: {vote.status}
                </p>
                <Link href={`/vote/${vote.id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {address && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-8 right-8">Create Vote</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Vote</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newVote.title}
                  onChange={(e) => setNewVote({ ...newVote, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newVote.description}
                  onChange={(e) => setNewVote({ ...newVote, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {newVote.options.map((option, index) => (
                <div key={index} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={`option-${index}`} className="text-right">
                    Option {index + 1}
                  </Label>
                  <Input
                    id={`option-${index}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newVote.options];
                      newOptions[index] = e.target.value;
                      setNewVote({ ...newVote, options: newOptions });
                    }}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
            <Button onClick={handleCreateVote}>Create Vote</Button>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
}