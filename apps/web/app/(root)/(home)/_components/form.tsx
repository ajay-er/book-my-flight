import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const HeroForm = () => {
  return (
    <div className="font-bold max-w-[110vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            className="p-2 bg-gray-400/30 py-4 mt-2 rounded-xl "
            placeholder="  City or airport"
          />
        </div>
        <div>
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            className="p-2 bg-gray-400/30 py-4 mt-2 rounded-xl "
            placeholder="  City or airport"
          />
        </div>
        <div>
          <Label htmlFor="depart">Depart</Label>
          <Input
            id="depart"
            type="date"
            className="p-2 bg-gray-400/30 py-4 mt-2 rounded-xl "
          />
        </div>
        <div>
          <Label htmlFor="return">Return</Label>
          <Input
            id="return"
            type="date"
            className="p-2 bg-gray-400/30 py-4 mt-2 rounded-xl "
          />
        </div>
      </div>
      <div className="flex items-center mb-6">
        <Checkbox
          id="terms"
          checked
          className="border-2 border-gray-300 checked:border-2 checked:border-gray-600"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
        >
         Add nearby airports
        </label>
      </div>
      <Button className="w-full bg-blue-500 rounded-lg text-white p-4 font-bold">
        Search
      </Button>
    </div>
  );
};

export default HeroForm;
