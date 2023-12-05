import React from 'react';

interface ProductListItemAttributesProps {
  attributes: {
      id: number | string;
      name: string;
      options: string[],
    }[];
}

type Color = {
  [key: string]: string;
};

const ProductListItemAttributes: React.FC<ProductListItemAttributesProps> = ({ attributes }) => {


  const colors: Color = {
    'Beige': "#F5F5DC",
    'Green': "#008000",
    'Blue': "#0000FF",
    'Red': "#FF0000",
    'Yellow': "#FFFF00",
    'Black': "#000000",
  }

  if(!attributes || attributes.length === 0) return null;

  // Filter out the color attribute
  const colorsAttribute = attributes.filter((attribute) => {
    return attribute.name === 'Color';
  });

  // Filter out all other attributes
  const otherAttributes = attributes.filter((attribute) => {
    return attribute.name !== 'Color';
  });

  return (
    <div className="flex flex-col">
      {otherAttributes && otherAttributes.length > 0 && (
        <div className="flex flex-col mt-4">
          {otherAttributes.map((attribute) => {
            return (
              <div key={attribute.id} className="flex flex-wrap flex-row items-center gap-2 mb-2">
                <p className="mr-2 text-xs">{attribute.name}</p>
                {attribute.options.map((option) => {
                  return (
                    <span key={option} className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center justify-center">
                      <p>{option}</p>
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
      {colorsAttribute && colorsAttribute.length > 0 && (
        <div className="flex flex-row lex-wrap">
          {colorsAttribute[0].options.map((option) => {
            return (
              <div 
                key={option} 
                className="w-6 h-6 rounded-full mr-2 shadow-lg border border-gray-200" 
                style={{backgroundColor: colors[option]}}
              />
            )
          })}
        </div>
      )}
    </div>
  )
  
}

export default ProductListItemAttributes;