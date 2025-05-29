export default function ProductOptions({ product }) {
    console.log('product.properties');
    console.log(product.properties);
    return (
        <div>
        {product?.properties?.length > 0 && product.properties.map(property => (
            <div key={property.name} className="">
              <label>{property.name[0].toUpperCase()+property.name.substring(1)}</label>
              <div>
                <select value={productProperties[property.name]}
                        onChange={ev =>
                          setProductProp(property.name,ev.target.value)
                        }
                >
                  {property.values.map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
    )
}