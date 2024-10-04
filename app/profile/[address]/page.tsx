'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const { address } = useParams();
  const { address: connectedAddress } = useAccount();
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
  });

  const [userVotes, setUserVotes] = useState([]);

  useEffect(() => {
    // Fetch user's vote history
    // This is a placeholder. In a real app, you'd fetch this data from your backend or blockchain
    setUserVotes([
      { id: 1, title: 'Best Programming Language', votedFor: 'JavaScript' },
      { id: 2, title: 'Favorite Web Framework', votedFor: 'Next.js' },
    ]);
  }, [address]);

  const isOwnProfile = connectedAddress === address;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 mt-16"
    >
      <div className="flex items-center mb-8">
        <Avatar className="h-24 w-24 mr-4">
          <AvatarImage src={`https://avatars.dicebear.com/api/identicon/${address}.svg`} />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">User Profile</h1>
          <p className="text-gray-500">{address}</p>
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{balance?.formatted} {balance?.symbol}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">Vote History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVotes.map((vote, index) => (
            <motion.div
              key={vote.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 * (index + 1) }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{vote.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Voted for: {vote.votedFor}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {isOwnProfile && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mt-8 mb-4">Link Accounts</h2>
          <div className="flex space-x-4">
            <Button variant="outline">Link Twitter</Button>
            <Button variant="outline">Link Discord</Button>
            <Button variant="outline">Link Telegram</Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}