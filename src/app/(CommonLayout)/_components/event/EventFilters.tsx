"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function EventFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "ALL");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = () => {
    let qs = createQueryString("search", search);
    
    if (type && type !== "ALL") {
       const params = new URLSearchParams(qs);
       params.set("type", type);
       qs = params.toString();
    } else {
       const params = new URLSearchParams(qs);
       params.delete("type");
       qs = params.toString();
    }

    router.push(`?${qs}`);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    const qs = createQueryString("type", value);
    router.push(`?${qs}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Input
        placeholder="Search by title or organizer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="max-w-md"
      />
      <Select value={type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[180px]">
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
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
