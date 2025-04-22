"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RatingScaleProps {
  label: string
  name: string
  value: number
  onChange: (value: number) => void
}

export function RatingScale({ label, name, value, onChange }: RatingScaleProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <RadioGroup
        value={value.toString()}
        onValueChange={(val) => onChange(Number.parseInt(val))}
        className="flex space-x-4 items-center"
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <div key={rating} className="flex items-center space-x-1">
            <RadioGroupItem value={rating.toString()} id={`${name}-${rating}`} />
            <Label htmlFor={`${name}-${rating}`} className="cursor-pointer">
              {rating}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

