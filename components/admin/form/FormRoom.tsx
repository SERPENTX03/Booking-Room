import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectNumber } from "@/utils/SelectNumber";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import { Textarea } from "@/components/ui/textarea";

const FormRoom = () => {
  return (
    <div className="">
      <div className="max-w-[600px] mt-10 mx-auto border">
        <Card>
          <form className="p-6" action="">
            <h1 className="font-bold text-2xl text-center">เพิ่มห้องพัก</h1>

            <Label htmlFor="nameroom">ชื่อห้อง</Label>
            <Input
              className="mb-3"
              id="nameroom"
              placeholder="ชื่อห้อง"
              type="text"
              name="name"
              required
            />
            {/* Price ราคา*/}

            <Label htmlFor="price">ราคา</Label>
            <Input
              className="mb-3"
              id="price"
              placeholder="ราคา"
              type="number"
              name="price"
              required
            />
            {/* Capacity รองรับกี่คน*/}

            <Label htmlFor="capacity">รองรับได้กี่คน</Label>
            <Select defaultValue={SelectNumber[0].label} required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SelectNumber.map((item, index) => (
                    <SelectItem key={index} value={item.label}>
                      {item.id}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* isAvailable ห้องว่างหรือไม่ */}

      
            {/* Image */}

            <Label htmlFor="nameroom">รูปภาพ</Label>
            <Input
              className="mb-3"
              id="nameroom"
              placeholder="ชื่อห้อง"
              type="file"
              name="name"
              required
            />
            {/* Description*/}

            <Label htmlFor="nameroom">รายระเอียด</Label>
            <Textarea />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default FormRoom;
