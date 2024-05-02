import { useEffect, useState } from "react";
import { MdAdd, MdCancel, MdDelete } from "react-icons/md";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import moment from "moment";

const HomeScreen = () => {
  const [data, setData] = useState<{}>({});
  const [text, setText] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  const onToggle = () => {
    setToggle(!toggle);
  };
  const URL = "https://taskbe-u1u8.onrender.com";
  const fetchdata = () => {
    fetch(`${URL}/get-combine`, { method: "GET" })
      .then((res: Response) => {
        return res.json();
      })
      .then((res) => {
        setData(res?.data);
      });
  };
  const moveToProgress = (ID: string) => {
    fetch(`${URL}/create-todo-progress/${ID}`, { method: "PATCH" })
      .then((res: Response) => {
        window.location.reload();
        return res.json();
      })
      .then((res) => {
        console.log(res, "update to progress");
      });
  };
  const moveToDone = (ID: string) => {
    fetch(`${URL}/create-todo-done/${ID}`, { method: "PATCH" })
      .then((res: Response) => {
        window.location.reload();

        return res.json();
      })
      .then((res) => {
        console.log(res, "update to done");
      });
  };

  const deleteTodo = (ID: string) => {
    fetch(`${URL}/delete-todo/${ID}`, { method: "DELETE" })
      .then((res: Response) => {
        window.location.reload();

        return res.json();
      })
      .then((res) => {
        console.log(res, "delete to done");
      });
  };

  const createTask = () => {
    fetch(`${URL}/create-todo`, {
      method: "POST",
      body: JSON.stringify({ title: text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "created successfully");
      });
  };
  console.log(createTask);
  const onHandleSubmit = () => {
    if (text === "") {
      createTask();
      window.location.reload();
    }
  };

  let title = Object.keys(data);
  let value = Object.values(data);
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="p-8 flex flex-col relative">
      {toggle && (
        <div className="absolute flex flex-col top-0 w-full h-screen left-0 items-center justify-center backdrop-blur-lg z-10">
          <MdCancel
            className="absolute top-5 right-20 text-4xl text-blue-950 "
            onClick={onToggle}
          />
          <input
            className="w-[300px] border h-[40px] p-2 bg-white outline-none rounded-md"
            placeholder="text"
            type="text"
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            required
          />
          <button
            onClick={() => {
              setText(""), onHandleSubmit(), onToggle;
            }}
            className="w-[300px] border h-[40px] p-2 bg-slate-400 mt-5 text-black mb-20 rounded-md text-[18px]"
          >
            Add
          </button>
        </div>
      )}
      <div className="border rounded-md  p-4 grid-cols-3 grid overflow-x-auto">
        <div className="grid grid-cols-3 col-span-3 gap-4">
          {title.map((props: string) => (
            <div
              className=" border rounded-md p-4 w-[300px] flex justify-between items-center text-blue-950"
              key={props}
            >
              <span className=" capitalize font-semibold">{props}</span>
              {props === "task" && (
                <MdAdd
                  size={20}
                  className=" cursor-pointer "
                  onClick={onToggle}
                />
              )}
            </div>
          ))}
        </div>

        <div ref={parent} className="mt-6 col-span-3 gap-5 grid grid-cols-3">
          {value.map((el: any) => (
            <div>
              {el.map((props: any) => (
                <main className="border rounded-md my-2 p-2">
                  <p className="font-bold text-[18px] mb-1">{props.title}</p>
                  <p className=" text-[12px] mb-1">
                    {" "}
                    {moment(props.createdAt).fromNow()}
                  </p>

                  <div className=" w-full">
                    <div className=" flex justify-between items-center mt-1">
                      <div>
                        <MdDelete
                          size={20}
                          onClick={() => {
                            deleteTodo(props?._id);
                          }}
                          className=" cursor-pointer"
                        />
                      </div>
                      <button
                        onClick={() => {
                          {
                            props?.progress && !props.done
                              ? moveToDone(props?._id)
                              : !props?.progress && !props?.done
                              ? moveToProgress(props?._id)
                              : !props?.todo;
                          }
                        }}
                        className={`py-2 px-4 text-white rounded-md cursor-pointer font-bold text-[12px] tracking-widest ${
                          props.progress && !props?.done
                            ? "bg-orange-500"
                            : props?.progress && props.done
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {props.progress && props.done
                          ? "completed"
                          : props.progress
                          ? "in progress"
                          : "start"}
                      </button>
                    </div>
                  </div>
                </main>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
