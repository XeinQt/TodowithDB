function App() {
  return (
    <div className="bg-amber-200 h-[100vh] flex items-center justify-center">
      <div className="bg-blue-400 rounded-3xl w-2xl">
        <h1 className="text-center text-5xl font-bold mt-5 mb-5">Todo List</h1>
        {/* top div */}
        <div className=" py-3 px-2 rounded-t-3xl">
          <input
            className="bg-white w-3/4 px-2 py-3 focus: outline-none"
            type="text"
          />
          <button className="bg-green-500 w-1/4 px-2 py-3 text-white cursor-pointer">
            Add
          </button>
        </div>
        {/* bottom div */}
        <div className="bg-red-300 py-5 px-2 rounded-b-3xl">
          {/*1st todo list*/}
          <div className="bg-white flex mb-3">
            {" "}
            <p className="w-3/4 py-3 px-2 ">Doign Home work</p>
            <div className="w-1/4">
              <button className="py-3 px-2 bg-yellow-300 w-1/2 cursor-pointer">
                Edit
              </button>
              <button className="py-3 px-2 bg-red-400 w-1/2 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
          {/*wnd todo list*/}
          <div className="bg-white flex ">
            {" "}
            <p className="w-3/4 py-3 px-2 ">Doign Home work</p>
            <div className="w-1/4">
              <button className="py-3 px-2 bg-yellow-300 w-1/2 cursor-pointer">
                Edit
              </button>
              <button className="py-3 px-2 bg-red-400 w-1/2 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
          {/*End */}
        </div>
      </div>
    </div>
  );
}

export default App;
