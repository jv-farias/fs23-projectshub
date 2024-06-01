"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Code2Icon, XIcon } from "lucide-react";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";

type InputTagsProps = InputProps & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

// eslint-disable-next-line react/display-name
export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState("");

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint("");
      }
    };

    return (
      <>
        <div className="flex">
          <div className="bg-secondary h-10 flex items-center justify-center rounded-l-lg min-w-10 max-w-10">
            <Code2Icon className="min-w-[18px] opacity-30" />
          </div>
          <Input
            placeholder="HTML, CSS, Typescript, Javascript"
            value={pendingDataPoint}
            onChange={(e) => setPendingDataPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPendingDataPoint();
              } else if (e.key === "," || e.key === " ") {
                e.preventDefault();
                addPendingDataPoint();
              }
            }}
            className="rounded-none"
            {...props}
            ref={ref}
          />
          <Button
            type="button"
            variant="secondary"
            className="rounded-l-none border border-l-0"
            onClick={addPendingDataPoint}
          >
            Add
          </Button>
        </div>
        <p className="text-xs">Pressione Enter para adicionar</p>
        <div className="border mt-3 rounded-md min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center">
          {value.length > 0 ? (
            value.map((item, idx) => (
              <Badge key={idx} variant="secondary">
                {item}
                <button
                  type="button"
                  className="w-3 ml-2"
                  onClick={() => {
                    onChange(value.filter((i) => i !== item));
                  }}
                >
                  <XIcon className="w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-center text-sm">Nenhuma tecnologia</p>
          )}
        </div>
      </>
    );
  }
);
