import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  treeDatas: [
    {
      id: 1,
      name: 'Tayfun',
      lastUpdated: 'Thu Mar 23 2023 / 23:12:35',
      userCount: 6,
      tree: [
        {
          id: 1,
          text: 'Tayfun',
          price: 0,
          total: 0,
          parentId: null,
        },
        {
          id: 2,
          text: 'Mehmet',
          price: 0,
          total: 0,
          parentId: 1,
        },
        {
          id: 3,
          text: 'Mete',
          price: 0,
          total: 0,
          parentId: 1,
        },
        {
          id: 4,
          text: 'Ozan',
          price: 0,
          total: 0,
          parentId: 2,
        },
        {
          id: 5,
          text: 'Utku',
          price: 0,
          total: 0,
          parentId: 2,
        },
        {
          id: 6,
          text: 'Mert',
          price: 0,
          total: 0,
          parentId: 4,
        }
      ]
    },
    {
      id: 2,
      name: 'Aslı',
      lastUpdated: 'Thu Mar 23 2023 / 23:10:35',
      userCount: 6,
      tree: [
        {
          id: 1,
          text: 'Aslı',
          price: 0,
          total: 0,
          parentId: null,
        },
        {
          id: 2,
          text: 'Yeşim',
          price: 0,
          total: 0,
          parentId: 1,
        },
        {
          id: 3,
          text: 'Selin',
          price: 0,
          total: 0,
          parentId: 1,
        },
        {
          id: 4,
          text: 'Sena',
          price: 0,
          total: 0,
          parentId: 2,
        },
        {
          id: 5,
          text: 'Umut',
          price: 0,
          total: 0,
          parentId: 2,
        },
        {
          id: 6,
          text: 'Mustafa',
          price: 0,
          total: 0,
          parentId: 4,
        }
      ]
    },
    {
      id: 3,
      name: 'Tolunay',
      lastUpdated: 'Thu Mar 23 2023 / 23:10:08',
      userCount: 6,
      tree: [
        {
          id: 1,
          text: 'Tolunay',
          price: 0,
          total: 0,
          parentId: null,
        },
        {
          id: 2,
          text: 'Pelin',
          price: 0,
          total: 0,
          parentId: 1,
        },
        {
          id: 3,
          text: 'Uğur',
          price: 0,
          total: 0,
          parentId: 1,
        },
        {
          id: 4,
          text: 'İbrahim',
          price: 0,
          total: 0,
          parentId: 2,
        },
        {
          id: 5,
          text: 'Rıdvan',
          price: 0,
          total: 0,
          parentId: 2,
        },
        {
          id: 6,
          text: 'Yusuf',
          price: 0,
          total: 0,
          parentId: 4,
        }
      ]
    },
    {
      id: 4,
      name: 'Tolunay',
      lastUpdated: 'Thu Mar 23 2023 / 23:10:03',
      userCount: 1,
      tree: [
        {
          id: 1,
          text: 'Tolunay',
          price: 0,
          total: 0,
          parentId: null,
        }
      ],
    },
    {
      id: 5,
      name: 'Yavuz',
      lastUpdated: 'Thu Mar 23 2023 / 23:10:02',
      userCount: 1,
      tree: [
        {
          id: 1,
          text: 'Yavuz',
          price: 0,
          total: 0,
          parentId: null,
        }
      ],
    },
    {
      id: 6,
      name: 'Melike',
      lastUpdated: 'Thu Mar 23 2023 / 23:10:01',
      userCount: 1,
      tree: [
        {
          id: 1,
          text: 'Melike',
          price: 0,
          total: 0,
          parentId: null,
        }
      ],
    },
    {
      id: 7,
      name: 'Şeyma',
      lastUpdated: 'Thu Mar 23 2023 / 23:08:08',
      userCount: 1,
      tree: [
        {
          id: 1,
          text: 'Şeyma',
          price: 0,
          total: 0,
          parentId: null,
        }
      ],
    },
    {
      id: 8,
      name: 'Ezgi',
      lastUpdated: 'Thu Mar 23 2023 / 23:01:08',
      userCount: 1,
      tree: [
        {
          id: 1,
          text: 'Ezgi',
          price: 0,
          total: 0,
          parentId: null,
        }
      ],
    },
  ]
};

export const treeDatas = createSlice({
  name: 'treeData',
  initialState,
  reducers: {

    addTree: (state, action) => {
      state.treeDatas.push(
        {
          id: Math.random().toString(36).substring(2),
          name: action.payload.newTreeName,
          lastUpdated: action.payload.lastUpdated,
          userCount: 1,
          tree: [
            {
              id: Math.random().toString(36).substring(2),
              text: action.payload.newTreeName,
              price: 0,
              total: 0,
              parentId: null,
            }
          ]
        }
      );
    },

    renameTree: (state, action) => {
      state.treeDatas = state.treeDatas.map((item) => {
        if (item.id === action.payload.focusRenameId) {
          item.name = action.payload.newTreeName;
        };
        return item;
      });
    },

    deleteTree: (state, action) => {
      state.treeDatas = state.treeDatas.filter((item) => item.id !== action.payload);
    },

    addUser: (state, action) => {
      state.treeDatas[action.payload.currentId].tree.push({
        id: Math.random().toString(36).substring(2),
        text: action.payload.userName,
        price: 0,
        parentId: action.payload.id,
        total: 0,
      });
    },

    renameUser: (state, action) => {
      state.treeDatas[action.payload.currentId].tree = state.treeDatas[action.payload.currentId].tree.map((item) => {
        if (item.id === action.payload.id) {
          item.text = action.payload.text;
        };
        return item;
      });
    },

    deleteUser: (state, action) => {

      const updateTotalUser = () => {
        state.treeDatas[action.payload.currentId].tree = state.treeDatas[action.payload.currentId].tree.map((item) => {
          if (item.id === action.payload.id) {
            let passed = false;
            const recursiveFunc = (parentId) => {
              if (parentId !== null) {
                state.treeDatas[action.payload.currentId].tree.map((item2) => {
                  if (item2.id === parentId) {
                    item2.total -= item.total;
                    recursiveFunc(item2.parentId);
                  };
                });
              };
              passed = true;
            };
            !passed && recursiveFunc(item.parentId);
          };
          return item;
        });
      };

      const deleteUsersRecursiveFunc = (id) => {

        state.treeDatas[action.payload.currentId].tree.filter((item) => item.parentId === id).forEach((item) => {
          deleteUsersRecursiveFunc(item.id);
        });

        const index = state.treeDatas[action.payload.currentId].tree.findIndex((item) => item.id === id);
        if (index > -1) {
          state.treeDatas[action.payload.currentId].tree.splice(index, 1);
        } else {
          return;
        }
        deleteUsersRecursiveFunc(action.payload);
      };

      updateTotalUser();
      deleteUsersRecursiveFunc(action.payload.id);
    },

    increment: (state, action) => {
      state.treeDatas[action.payload.currentId].tree = state.treeDatas[action.payload.currentId].tree.map((item) => {
        if (item.id === action.payload.id) {
          item.price += 1;
          item.total += 1;
          let passed = false;
          const recursiveFunc = (parentId) => {
            if (parentId !== null) {
              state.treeDatas[action.payload.currentId].tree.map((item2) => {
                if (item2.id === parentId) {
                  item2.total += 1;
                  recursiveFunc(item2.parentId);
                };
              });
            };
            passed = true;
          };
          !passed && recursiveFunc(item.parentId);
        };
        return item;
      });
    },

    decrement: (state, action) => {
      state.treeDatas[action.payload.currentId].tree = state.treeDatas[action.payload.currentId].tree.map((item) => {
        if (item.id === action.payload.id && item.price > 0) {
          item.price -= 1;
          item.total -= 1;
          let passed = false;
          const recursiveFunc = (parentId) => {
            if (parentId !== null) {
              state.treeDatas[action.payload.currentId].tree.map((item2) => {
                if (item2.id === parentId && item2.total > 0) {
                  item2.total -= 1;
                  recursiveFunc(item2.parentId);
                };
              });
            }
            passed = true;
          }
          !passed && recursiveFunc(item.parentId);
        };
        return item;
      });
    },
  },
});

export const { addUser, deleteUser, increment, decrement, renameUser, addTree, deleteTree, renameTree } = treeDatas.actions;

export default treeDatas.reducer;