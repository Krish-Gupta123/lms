// src/hooks/useSocketEvents.js

import toast from 'react-hot-toast';
import { useEffect } from 'react';
import socket from '../socket';

export default function useSocketEvents({ onBookUpdate, onNotification, onReservation, onAdminStats }) {
  useEffect(() => {
    // Book availability updates
    socket.on('book:updated', (data) => {
      if (onBookUpdate) onBookUpdate(data);
    });
    socket.on('book:added', (data) => {
      if (onBookUpdate) onBookUpdate(data);
    });
    socket.on('book:deleted', (data) => {
      if (onBookUpdate) onBookUpdate(data);
    });

    // Notifications
    socket.on('notification', (data) => {
      if (onNotification) onNotification(data);
      // Show toast for demo
      if (data.type === 'book_issued') toast('Book issued!');
      if (data.type === 'book_returned') toast('Book returned!');
      if (data.type === 'reservation_accepted') toast('Your reservation is accepted!');
      if (data.type === 'reservation_rejected') toast('Your reservation is rejected.');
      if (data.type === 'reservation_created') toast('Reservation request sent!');
      if (data.type === 'book_added') toast('New book added!');
      if (data.type === 'book_deleted') toast('Book deleted!');
    });

    // Reservation events
    socket.on('reservation:created', (data) => {
      if (onReservation) onReservation(data);
    });
    socket.on('reservation:accepted', (data) => {
      if (onReservation) onReservation(data);
    });
    socket.on('reservation:rejected', (data) => {
      if (onReservation) onReservation(data);
    });

    // Admin dashboard events
    socket.on('admin:onlineUsers', (count) => {
      if (onAdminStats) onAdminStats({ onlineUsers: count });
    });
    socket.on('admin:activity', (data) => {
      if (onAdminStats) onAdminStats({ activity: data });
    });

    return () => {
      socket.off('book:updated');
      socket.off('book:added');
      socket.off('book:deleted');
      socket.off('notification');
      socket.off('reservation:created');
      socket.off('reservation:accepted');
      socket.off('reservation:rejected');
      socket.off('admin:onlineUsers');
      socket.off('admin:activity');
    };
  }, [onBookUpdate, onNotification, onReservation, onAdminStats]);
}
