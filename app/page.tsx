"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          <div className="text-center text-white">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl font-bold mb-4"
            >
              Welcome to Voting App
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl mb-8"
            >
              Decentralized voting on Linea Sepolia
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/vote">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Start Voting
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-8 text-center"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Create a Vote', 'Share', 'Vote'].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.8 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-2xl font-semibold mb-4">{step}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-8 text-center"
            >
              Recent Votes
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * i, duration: 0.8 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">Sample Vote {i}</h3>
                  <p className="mb-4">A brief description of the vote...</p>
                  <Link href={`/vote/${i}`}>
                    <Button variant="outline">View Results</Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Voting App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}