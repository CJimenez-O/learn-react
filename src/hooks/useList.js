import { useState } from "react";

function useList(init) {
  const [list, setList] = useState(init);

  return {
    list,
    removeItem(item) {
      //find which prop you are clicking on
      console.log(item);
      // filters new list after prop is clicked
      const filteredProp = list.filter((v) => v.name !== item);
      setList(filteredProp);
    },
    saveItem(index, newVal) {
      const copyList = [...list];
      copyList[index].name = newVal;
    },
  };
}

export default useList;