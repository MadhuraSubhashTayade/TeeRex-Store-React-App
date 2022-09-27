import React from "react";
import "../index.css";
import "../queries.css";

const FilterBar = ({
  handleFilterCheckChanged,
  colorFilter,
  genderFilter,
  typeFilter,
  priceFilter,
}) => {
  const arr = [typeFilter, genderFilter, colorFilter, priceFilter];

  return (
    <>
      <div className="sidebar-container">
        {arr.map((ele) => {
          const { group, values } = ele;
          return (
            <div className="sidebar" key={group}>
              <p>{group}</p>
              <form>
                {values.map((value) => {
                  const { id, checked, label } = value;
                  return (
                    <div className="div-row" key={id}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleFilterCheckChanged(id, group)}
                      />
                      <label>
                        {typeof label === "string" ? label : label.join("-")}
                      </label>
                    </div>
                  );
                })}
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilterBar;
