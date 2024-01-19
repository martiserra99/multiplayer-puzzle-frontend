const styles = {
  background: "#060607",
  surface: {
    background: "#1f1f20",
    border: {
      color: "#383839",
      size: 2,
    },
    corner: {
      type: "round",
      size: 8,
    },
  },
  puzzle: {
    margin: 50,
  },
  pieces: {
    gap: 20,
  },
  square: {
    size: 20,
    margin: 2,
    border: {
      size: 2,
    },
    corner: {
      type: "round",
      size: 4,
    },
  },
  rotate: {
    height: 32,
    margin: 8,
  },
};

export const effect = {
  surface: {
    focus: {
      background: "#383839",
    },
  },
};

export const colors = [
  ["#f94144", "#e03b3d"],
  ["#f3722c", "#db6728"],
  ["#f8961e", "#df871b"],
  ["#f9844a", "#e07743"],
  ["#f9c74f", "#e0b347"],
  ["#90be6d", "#82ab62"],
  ["#43aa8b", "#3c997d"],
  ["#4d908e", "#458280"],
  ["#577590", "#4e6982"],
  ["#277da1", "#237191"],
];

export default styles;
