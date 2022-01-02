import type { Entry } from '../types';

type Props = {
  entry: Entry;
};
function Cell({ entry }: Props) {
  const { selectedBy, x, y } = entry;
  let classNames = 'cell ' + selectedBy;
  return (
    <div className={classNames}>
      {' '}
      [{x}, {y}]
    </div>
  );
}

export default Cell;
