"use client";

import { Button } from "@/components/ui/button";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";
import { useCallback, useState } from "react";

interface Props {
  value?: string;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPickerInput = ({ value, onEmojiSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback((emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  }, []);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button className="size-10" variant="outline">
          {value || <Smile />}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit p-0">
        <EmojiPicker
          defaultValue={value}
          className="h-85.5 overflow-auto"
          onEmojiSelect={({ emoji }) => handleChange(emoji)}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent className="scrollbar-thumb-only" />
          <EmojiPickerFooter />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPickerInput;
