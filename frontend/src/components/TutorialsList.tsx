import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import moment from "moment";
import TutorialDataService from "../services/TutorialService";
import { useTable } from "react-table";
import { TutorialType } from "../types/types";

const TutorialsList = (props: { history: string[] }) => {
  const [tutorials, setTutorials] = useState<Array<TutorialType>>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef<Array<TutorialType>>([]);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = useCallback(() => {
    TutorialDataService.getAll()
      .then((response) => {
        tutorialsRef.current = response.data;
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onChangeSearchTitle = (e: { target: { value: any } }) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  // const refreshList = () => {
  //   retrieveTutorials();
  // };

  // const removeAllTutorials = () => {
  //   TutorialDataService.removeAll()
  //     .then((response) => {
  //       refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const findByTitle = useCallback(() => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        tutorialsRef.current = response.data;
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchTitle]);

  const openTutorial = useCallback((rowIndex: number) => {
    const id = tutorialsRef.current[rowIndex].id;

    props.history.push("/tutorials/" + id);
  }, []);

  const deleteTutorial = useCallback((rowIndex: number) => {
    const id = tutorialsRef.current[rowIndex].id;

    TutorialDataService.remove(id)
      .then((response) => {
        props.history.push("/tutorials");

        let newTutorials = [...tutorialsRef.current];
        newTutorials.splice(rowIndex, 1);

        setTutorials(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props: { value: any }) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "UpdatedAt",
        accessor: "updatedAt",
        Cell: (props: { value: number }) => {
          return moment(new Date(props.value)).format("YYYY-MM-DD h:MM A");
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props: { row: { id: any } }) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TutorialType>({
      // @ts-ignore
      columns,
      data: tutorials,
    });

  return (
    <div className="list row">
      {/* <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map(
              (headerGroup: {
                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: any[];
              }) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(
                    (column: {
                      getHeaderProps: () => JSX.IntrinsicAttributes &
                        React.ClassAttributes<HTMLTableHeaderCellElement> &
                        React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
                      render: (
                        arg0: string
                      ) =>
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    )
                  )}
                </tr>
              )
            )}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (
                row: {
                  getRowProps: () => JSX.IntrinsicAttributes &
                    React.ClassAttributes<HTMLTableRowElement> &
                    React.HTMLAttributes<HTMLTableRowElement>;
                  cells: any[];
                },
                i: any
              ) => {
                // @ts-ignore
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(
                      (cell: {
                        getCellProps: () => JSX.IntrinsicAttributes &
                          React.ClassAttributes<HTMLTableDataCellElement> &
                          React.TdHTMLAttributes<HTMLTableDataCellElement>;
                        render: (
                          arg0: string
                        ) =>
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      }) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      }
                    )}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      {/* <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
          Remove All
        </button>
      </div> */}
    </div>
  );
};

export default TutorialsList;
