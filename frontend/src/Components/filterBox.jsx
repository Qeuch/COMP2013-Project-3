export default function FilterBox({ handleFilterPrices }) {
  return (
    <div>
      <h2>Filter Price</h2>
      <form>
        <label>
          <input
            type="radio"
            name="priceFilter"
            value="all"
            onChange={handleFilterPrices}
            defaultChecked
          />
          All Prices
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="priceFilter"
            value={0.99}
            onChange={handleFilterPrices}
          />
          {"< 1.00$"}
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="priceFilter"
            value={1.99}
            onChange={handleFilterPrices}
          />
          {"< 2.00$"}
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="priceFilter"
            value={3.99}
            onChange={handleFilterPrices}
          />
          {"< 4.00$"}
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="priceFilter"
            value={5.99}
            onChange={handleFilterPrices}
          />
          {"< 6.00$"}
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="priceFilter"
            value={8.99}
            onChange={handleFilterPrices}
          />
          {"< 9.00$"}
        </label>
      </form>
    </div>
  );
}
