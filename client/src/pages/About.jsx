import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        Trip<span>TUNES</span>
      </h1>
      <p className="mb-4 text-slate-700">
        TripTunes is more than just a travel site. It is a platform where you
        can explore, book, and review your dream trips with a musical twist.
        Whether you want to rock out at a concert, relax at a spa, or discover a
        new culture, TripTunes has something for everyone.
      </p>
      <p className="mb-4 text-slate-700">
        TripTunes is the best place to find your next travel destination. Unlike
        other apps and sites that offer generic and boring options, TripTunes
        lets you discover new and exciting places based on your personal
        preferences and interests. You can filter your search by name, budget,
        rating, and more, and see detailed information and reviews from other
        travelers. You can also book your flights, hotels, car rentals, and
        tours with ease and confidence, as TripTunes offers the best prices and
        guarantees. Plus, you can join a community of like-minded travelers who
        share their tips, stories, and playlists. With TripTunes, you can make
        your travel dreams come true.
      </p>
      <p className="mb-4 text-slate-700">
        Our team of experts has a passion and expertise for travel and music. We
        are committed to providing the best travel solutions to our customers.
        We believe that finding and booking your dream destination should be a
        fun and enjoyable experience, and we are dedicated to making that happen
        for each and every one of our customers.
      </p>
      <br />
      <a target="_blank" href="https://www.instagram.com/">
      <div className="flex gap-2">
      <FaInstagram className="text-2xl"/>
      <p>trip.tunes</p>
      </div>
      </a>
      
    </div>
  );
}
