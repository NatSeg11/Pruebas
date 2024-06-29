import React, { useState } from 'react';
import "../../index.css";
import { CardEvents } from "../UI/CardEvents.jsx";
import { EventsFilters } from "./EventsFilters.jsx";
import { EmptyState } from "../UI/EmptyState.jsx";
import { CalendarOff } from "lucide-react";

export function MyEvents({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    const matchesSearchTerm = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <>
      <h1 className="dark:text-white">My Events</h1>
      {filteredItems.length === 0 ? (
        <EmptyState 
          icon={CalendarOff} 
          title="No events on the horizon!" 
          message="Looks like you have some free time. Relax and enjoy!" 
        />
      ) : (
        <>
          <EventsFilters 
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
          />
          <div className="grid gap-4 grid-cols-auto-300 tablet:grid-cols-auto-250 w-full max-h-[52rem] xl:max-h-[55rem] overflow-y-scroll no-scrollbar">
            {filteredItems.map((item) => (
              <CardEvents
                key={item.title}
                title={item.title}
                percent={item.percent}
                description={item.description}
                date={item.date}
                hour={item.hour}
                image={item.image}
                category={item.category}
                label={item.label}
                status={item.status}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
