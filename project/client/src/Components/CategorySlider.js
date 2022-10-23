import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { categoryList } from "../../DataSimple";

const gridStyle = {
  width: "10%",
  textAlign: "center",
};

function CategorySlider(props) {
  return (
    <Card title="Category">
      {categoryList.map((category, idx) => {
        return (
          <Card.Grid style={gridStyle} key={idx} className="category-card-item">
            <img
              alt={category.path}
              src={category.image}
              className="category-card-item-img"
              width="70px"
              height="70px"
            />
            <p className="category-card-item-title">{category.title}</p>
          </Card.Grid>
        );
      })}
    </Card>
  );
}

CategorySlider.propTypes = {};

export default CategorySlider;
