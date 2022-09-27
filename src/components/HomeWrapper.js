import FilterBar from "./FilterBar";
import Products from "./Products";
import SearchBar from "./SearchBar";
import "../index.css";
import "../queries.css";
import React, { useEffect, useState } from "react";
import {
  typeFilters,
  genderFilters,
  colorFilters,
  priceFilters,
} from "../data.js/filters";

const HomeWrapper = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchParams] = useState(["name", "color", "type", "price", "gender"]);
  const [colorFilter, setColorFilter] = useState(colorFilters);
  const [typeFilter, setTypeFilter] = useState(typeFilters);
  const [genderFilter, setGenderFilter] = useState(genderFilters);
  const [priceFilter, setPriceFilter] = useState(priceFilters);
  const [showMobileFilter, setShowMobileFilter] = useState(true);

  // 1. Fetch all products
  const fetchData = () => {
    fetch(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 2. Handle search text change
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  // 3. Handle filters check changed
  const handleFilterCheckChanged = (id, category) => {
    if (category.toLowerCase() === "color") {
      const colors = colorFilter;
      const values = colors.values;
      const changedValues = values.map((val) =>
        val.id === id ? { ...val, checked: !val.checked } : val
      );
      const changedColors = { ...colors, values: changedValues };
      setColorFilter(changedColors);
    }
    if (category.toLowerCase() === "gender") {
      const gender = genderFilter;
      const values = gender.values;
      const changedValues = values.map((val) =>
        val.id === id ? { ...val, checked: !val.checked } : val
      );
      const changedGender = { ...gender, values: changedValues };
      setGenderFilter(changedGender);
    }
    if (category.toLowerCase() === "type") {
      const type = typeFilter;
      const values = type.values;
      const changedValues = values.map((val) =>
        val.id === id ? { ...val, checked: !val.checked } : val
      );
      const changedType = { ...type, values: changedValues };
      setTypeFilter(changedType);
    }
    if (category.toLowerCase() === "price") {
      const price = priceFilter;
      const values = price.values;
      const changedValues = values.map((val) =>
        val.id === id ? { ...val, checked: !val.checked } : val
      );
      const changedPrice = { ...price, values: changedValues };
      setPriceFilter(changedPrice);
    }
  };

  // 4. Filter products based on searched text and applied filters
  const filterProducts = () => {
    let productsList = products;

    // 1. group filters
    //--- 1. color filter
    const checkedColors = colorFilter.values
      .filter((x) => x.checked)
      .map((y) => y.label.toLowerCase());
    //--- 2. gender filter
    const checkedGender = genderFilter.values
      .filter((x) => x.checked)
      .map((y) => y.label.toLowerCase());
    //--- 3. type filter
    const checkedType = typeFilter.values
      .filter((x) => x.checked)
      .map((y) => y.label.toLowerCase());
    //--- 4. price filter
    const checkedPrice = priceFilter.values
      .filter((x) => x.checked)
      .flatMap((x) => x.label);
    //--- based on what filters are checked, prepare the products
    if (checkedColors.length) {
      productsList = productsList.filter((p) =>
        checkedColors.includes(p.color.toLowerCase())
      );
    }
    if (checkedGender.length) {
      productsList = productsList.filter((p) =>
        checkedGender.includes(p.gender.toLowerCase())
      );
    }
    if (checkedType.length) {
      productsList = productsList.filter((p) =>
        checkedType.includes(p.type.toLowerCase())
      );
    }
    if (checkedPrice.length) {
      const min = checkedPrice[0];
      const prices = products.map((x) => x.price);
      console.log("prices:: ", prices);
      const max =
        checkedPrice.length % 2 !== 0
          ? Math.max(...prices)
          : checkedPrice[checkedPrice.length - 1];
      console.log("CP=> ", checkedPrice);
      console.log("minmax=> " + min, max);
      productsList = productsList.filter((p) => {
        return p.price >= min && p.price <= max;
      });
    }

    // 2. searched text

    const result = productsList.filter((x) =>
      searchParams.some(
        (param) =>
          x[param].toString().toLowerCase().indexOf(searchText.toLowerCase()) >
          -1
      )
    );
    return result;
  };

  const handleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  return (
    <>
      <section className="main-section-search">
        <SearchBar
          searchText={searchText}
          handleSearchTextChange={handleSearchTextChange}
          showMobileFilter={showMobileFilter}
          handleMobileFilter={handleMobileFilter}
        />
      </section>
      <aside className={showMobileFilter ? "filters-content" : "switch-filter"}>
        <FilterBar
          colorFilter={colorFilter}
          genderFilter={genderFilter}
          typeFilter={typeFilter}
          priceFilter={priceFilter}
          handleFilterCheckChanged={handleFilterCheckChanged}
        />
      </aside>
      <article
        className={showMobileFilter ? "products-content" : "switch-product"}
      >
        <Products products={filterProducts()} addToCart={addToCart} />
      </article>
    </>
  );
};

export default HomeWrapper;
