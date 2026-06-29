import { memo } from 'react';
export const HeavyComponent = memo(function Heavy({ data }: { data: any }) {
  return <div>{data}</div>;
});