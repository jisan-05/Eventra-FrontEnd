"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function EventFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "ALL");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "ALL");
  const [sort, setSort] = useState(searchParams.get("sort") || "date-asc");

  const params = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const handleSearch = () => {
    if (search.trim()) params.set("search", search.trim());
    else params.delete("search");

    if (type !== "ALL") params.set("type", type);
    else params.delete("type");

    if (location.trim()) params.set("location", location.trim());
    else params.delete("location");

    if (price !== "ALL") params.set("price", price);
    else params.delete("price");

    if (sort) params.set("sort", sort);
    else params.delete("sort");

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const resetFilters = () => {
    router.push("/events");
  };

  return (
    <div className="mb-8 space-y-4 rounded-2xl border border-border bg-card p-4 md:p-5">
      <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Search by title or organizer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="md:max-w-md"
      />
        <Input
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="md:max-w-xs"
        />
      <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-full md:w-[190px]">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Categories</SelectItem>
          <SelectItem value="PUBLIC_FREE">Public Free</SelectItem>
          <SelectItem value="PUBLIC_PAID">Public Paid</SelectItem>
          <SelectItem value="PRIVATE_FREE">Private Free</SelectItem>
          <SelectItem value="PRIVATE_PAID">Private Paid</SelectItem>
        </SelectContent>
      </Select>
        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger className="w-full md:w-[170px]">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Prices</SelectItem>
            <SelectItem value="FREE">Free</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-asc">Date: Earliest</SelectItem>
            <SelectItem value="date-desc">Date: Latest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="title-asc">Title: A to Z</SelectItem>
            <SelectItem value="title-desc">Title: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-3">
      <Button onClick={handleSearch}>Search</Button>
        <Button onClick={resetFilters} variant="outline">Reset</Button>
      </div>
    </div>
  );
}
