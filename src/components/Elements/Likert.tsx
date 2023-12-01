import React, { FC, useContext } from 'react';
import { setSubmissionValue } from '../../lib/elements';
import { ClassNames } from '../../types';
import { SubmissionContext } from '../SnoopForm/SnoopForm';
import { PageContext } from '../SnoopPage/SnoopPage';

interface Column {
  label: string;
  id: string;
}

interface Row {
  label: string;
  id: string;
}

interface Props {
  name: string;
  label?: string;
  help?: string;
  placeholder?: string;
  classNames: ClassNames;
  required?: boolean;
  columns: Column[];
  rows: Row[];
}

export const Likert: FC<Props> = ({ name, rows, columns, label, classNames }) => {
  //const [checked, setChecked] = useState<string[]>([]);
  const { setSubmission }: any = useContext(SubmissionContext);
  const pageName = useContext(PageContext);

  //   useEffect(() => {
  //     setSubmissionValue(checked, pageName, name, setSubmission);
  //   }, [checked]);

  return (
    <div>
      {label && (
        <label
          className={
            classNames.label || 'block text-sm font-medium text-gray-700'
          }
        >
          {label}
        </label>
      )}
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            ></th>
            {columns.map(column => (
              <th
                key={column.label}
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {row.label}
              </td>
              {columns.map((column, colIdx) => (
                <td
                  key={colIdx}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  <input
                    id={column.label}
                    name={`row-${rowIdx}`}
                    type="radio"
                    defaultChecked={false}
                    className="h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-600"
                    onClick={() =>
                      setSubmissionValue(
                        { row: row.label, column: column.label },
                        pageName,
                        name,
                        setSubmission,
                        true
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
