import React, { Component } from "react";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
class SliderHeader extends Component {
  render() {
    return (
      <div className={"slider-header " + this.props.removePaddingTop}>
        <div className="slider-header-title">
          <h2>{this.props.headTitle}</h2>
          <Link
            href={`/listing/[slug]`}
            key={this.props.listLink}
            as={`/listing/${this.props.listLink}`}
          >
            <Tooltip color="pink" title="view all">
              <EyeOutlined />
            </Tooltip>
          </Link>
        </div>

        <div className="slider-detail">{this.props.headDetails}</div>
      </div>
    );
  }
}

export default SliderHeader;
