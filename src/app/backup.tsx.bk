'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useSearchParams } from 'next/navigation';
import { detectLanguage } from '@/utils/tts.utils';

interface Donation {
  id: string;
  name: string;
  message: string;
  amount: number;
}

const notiAudio =
  typeof Audio !== 'undefined' ? new Audio('/cashier-quotka.mp3') : null;

export default function Home() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [socketId, setSocketId] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [ttsEnabled, setTTSEnabled] = useState(false);
  const [fadingItemId, setFadingItemId] = useState<string | null>(null);
  const [visibleQueue, setVisibleQueue] = useState<Donation[]>([]);
  const hasInteracted = useRef(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance>(null);
  const speakingRef = useRef(false);
  const queueRef = useRef<Donation[]>([]);

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(timeString);
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const speakThaiMessage = async (donation: Donation) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        setFadingItemId(donation.id);
        speakingRef.current = true;
        if (notiAudio) {
          notiAudio.play();
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
        const message = `คุณ ${donation.name} บริจาคจำนวน ${donation.amount} บาท ข้อความ: ${donation.message}`;
        console.log('Speaking', message);
        const utterance = new SpeechSynthesisUtterance(message);
        console.log('utterance ', utterance);
        utterance.lang = detectLanguage(message);
        speechSynthesisRef.current = utterance;

        utterance.onend = () => {
          setTimeout(() => {
            queueRef.current = queueRef.current.filter(
              (q) => q.id !== donation.id
            );
            setVisibleQueue([...queueRef.current]);
            setFadingItemId(null);
            speakingRef.current = false;
          }, 500); // รอ fade ออก
        };

        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
          setFadingItemId(null);
          speakingRef.current = false;
          console.error('SpeechSynthesisErrorEvent:', event);
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('speakThaiMessage Error:', error);
      }
    }
  };

  const processQueue = useCallback(() => {
    if (!speakingRef.current && queueRef.current.length > 0) {
      const next = queueRef.current.shift(); // ดึงรายการถัดไป
      if (next) {
        speakThaiMessage(next);
      }
    } else {
      setVisibleQueue([...queueRef.current]);
    }
  }, []);

  // ✅ เริ่ม loop คอยดึงจาก queue
  useEffect(() => {
    if (ttsEnabled) {
      const interval = setInterval(processQueue, 500);
      return () => {
        clearInterval(interval);
        // หยุดการพูดถ้ามีการ unmount component
        if (speechSynthesisRef.current && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [processQueue, ttsEnabled]);

  useEffect(() => {
    if (!token) return;

    const socket = io('http://localhost:3000', {
      query: { token },
    });

    socket.on('connect', () => {
      if (socket.id) {
        setSocketId(socket.id);
      }
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setSocketId('');
      setConnected(false);
    });

    socket.on('donation', async (donation: Omit<Donation, 'id'>) => {
      console.log('donation ', donation);
      const donationWithId: Donation = {
        ...donation,
        id: crypto.randomUUID(),
      };
      console.log('donationWithId ', donationWithId);
      setDonations((prev) => prev.concat(donationWithId));
      queueRef.current.push(donationWithId);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const handleEnableTTS = () => {
    // Once user clicks, TTS can be allowed
    hasInteracted.current = true;
    setTTSEnabled(true);

    // Dummy first utterance (บาง browser ต้องมีการเรียก speak() สั้น ๆ ก่อน)
    const initUtterance = new SpeechSynthesisUtterance('ระบบพร้อมใช้งานแล้ว');
    initUtterance.lang = 'th-TH';
    window.speechSynthesis.speak(initUtterance);
  };

  const currentDonation = donations.find((item) => item.id === fadingItemId);

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-start justify-items-end min-h-screen'>
      <main className='flex flex-col items-end justify-start'>
        <div className='text-2xl font-mono font-bold text-blue-500'>
          {currentTime}
        </div>
        <h2 className='text-xl mb-4 text-center text-blue-400'>
          Recent Donations
        </h2>
        {!ttsEnabled && (
          <>
            <button
              onClick={handleEnableTTS}
              className='m-2 p-2 text-black rounded-xl border-[2] border-green-600 '
            >
              <div>✅ เริ่มต้นระบบ</div>
            </button>
            <div className='text-xs text-black'>
              <span className='text-red-500'>หมายเหตุ:</span> ถ้าไม่กดปุ่มนี้
              ระบบจะไม่เริ่มอ่าน{' '}
            </div>
          </>
        )}

        <div className='w-fit max-w-md'>
          <div className={queueRef.current.length > 0 ? 'min-h-20' : ''}>
            {!!currentDonation && (
              <>
                <h1 className='py-2 text-3xl text-black text-center'>
                  🎤 {currentDonation?.name} →{' '}
                  <span className='text-red-600'>
                    {currentDonation?.amount}
                  </span>{' '}
                  บาท
                </h1>
                <h3 className='text-blue-400 text-center'>
                  {currentDonation?.message}
                </h3>
              </>
            )}
          </div>

          {/* {donations.length === 0 ? (
            <p className='text-gray-500 text-center'>No donations yet</p>
          ) : (
            <ul className='space-y-2'>
              {queueRef.current.map((donation) => (
                <li
                  key={donation.id}
                  className='p-3 bg-gray-100 dark:bg-gray-800 rounded'
                >
                  <div className='font-bold'>
                    {donation.name} donated ${donation.amount}
                  </div>
                  <div>{donation.message}</div>
                </li>
              ))}
            </ul>
          )} */}
        </div>
        <ul className='px-4  text-black text-right'>
          {visibleQueue.map((item) => (
            <li
              key={item.id}
              className={`py-1 rounded bg-white/10 backdrop-blur transition-opacity duration-500 transform ${
                item.id === fadingItemId
                  ? 'opacity-0 -translate-y-2'
                  : 'opacity-100'
              }`}
              onTransitionEnd={() => {
                if (item.id === fadingItemId) {
                  queueRef.current = queueRef.current.filter(
                    (q) => q.id !== item.id
                  );
                  setVisibleQueue([...queueRef.current]);
                }
              }}
            >
              {item.name} → {item.amount} บาท
            </li>
          ))}
        </ul>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        {token ? (
          <div className='flex flex-col gap-2 text-sm'>
            <div className='text-black'>
              {connected ? '✅ Connected: ' : '❌ Disconnected'}
              {socketId && (
                <span className='text-xs text-gray-500'> {socketId}</span>
              )}
            </div>
          </div>
        ) : (
          <div className='text-sm text-red-500'>
            No token provided. Please add ?token=YOUR_TOKEN to the URL
          </div>
        )}
      </footer>
    </div>
  );
}
