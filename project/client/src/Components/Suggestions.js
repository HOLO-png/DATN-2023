import { useState } from "react";
import PropTypes from "prop-types";
import { Affix, Button, Col, Row } from "antd";
import { categorySuggestions } from "../../DataSimple";

function Suggestions(props) {
  const [active, setActive] = useState(0);

  return (
    <Affix offsetTop={80}>
      <div className="suggestions">
        <div className="category-select-title">
          <i className="fad fa-lightbulb-on"></i> Suggestions for you
        </div>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            margin: 0,
            borderTop: " 5px solid #f8f8f8",
            borderBottom: " 5px solid #f8f8f8",
            borderRadius: "5px",
          }}
        >
          {categorySuggestions.map((item, index) => (
            <Col
              className="gutter-row"
              span={3}
              style={{ padding: 0 }}
              key={index}
            >
              <div
                className={
                  active === index
                    ? "category-select-card active"
                    : "category-select-card"
                }
                onClick={() => setActive(index)}
              >
                <div className="category-select-img">
                  <img alt="" src={item.image} />
                </div>
                <Button type="link">{item.title}</Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Affix>
  );
}

Suggestions.propTypes = {};

export default Suggestions;
