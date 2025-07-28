import { forwardRef } from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';

import { cn } from '@/lib/utils';

import { Icons } from '@/components/icons';
import { Input } from './input';

interface CurrencyInputProps extends Omit<NumericFormatProps, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ onChange, ...rest }, ref) => {
    return (
      <div className="relative">
        <div className="-translate-y-1/2 absolute top-1/2 left-3 transform">
          <Icons.dollarSign className="h-4 w-4 text-gray-500" />
        </div>
        <NumericFormat
          thousandSeparator=","
          decimalSeparator="."
          customInput={Input}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange(values.floatValue ?? 0);
          }}
          {...rest}
          className={cn('pl-10', rest.className)}
          type="text"
          defaultValue={undefined}
        />
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export { CurrencyInput };