exports.getFilterQuery = (schema, filter, page, pageSize, defaultSort) => {
  let filterStr;
  let paginationStr;

  const skip = (page - 1) * pageSize;
  paginationStr = "ORDER BY";
  let defaultSortStr = `${defaultSort} asc`;
  let sortStr = "";
  const sort = filter.sort;

  delete filter.page;
  delete filter.pageSize;
  delete filter.sort;

  if (filter) {
    filterStr = "";
    let i = 0;
    for (let criteria in filter) {
      if (schema[criteria]) {
        const schemaProp = schema[criteria];
        if (i > 0) {
          filterStr += " AND ";
        } else {
          filterStr += "WHERE ";
        }

        if (schemaProp.type === "number") {
          if (typeof filter[criteria] === "object") {
            let j = 0;
            for (let criteriaOperator in filter[criteria]) {
              let operator;
              let criterialVal;

              if (criteriaOperator === "gt") {
                operator = ">";
                criterialVal = filter[criteria]["gt"];
              } else if (criteriaOperator === "gte") {
                operator = ">=";
                criterialVal = filter[criteria]["gte"];
              } else if (criteriaOperator === "lt") {
                operator = "<";
                criterialVal = filter[criteria]["lt"];
              } else if (criteriaOperator === "lte") {
                operator = "<=";
                criterialVal = filter[criteria]["lte"];
              } else if (criteriaOperator === "eq") {
                operator = "=";
                criterialVal = filter[criteria]["eq"];
              }

              if (operator && criterialVal) {
                if (j > 0) {
                  filterStr += " AND ";
                }
                filterStr += criteria + " " + operator + " " + criterialVal;
                i++;
                j++;
              }
            }
          } else {
            filterStr += criteria + " = " + filter[criteria];
            i++;
          }
        } else if (schemaProp.type === "string") {
          filterStr += criteria + " = '" + filter[criteria] + "'";
          i++;
        }
      }
    }
  }

  if (sort) {
    let sortCriterias = sort.split(",");
    if (sortCriterias.length > 0) {
      // console.log(sortCriterias);
      sortCriterias.forEach((criteria) => {
        let sortDirection = "asc";
        let sortProp = criteria;
        if (criteria.startsWith("-")) {
          sortDirection = "desc";
          sortProp = criteria.replace(/^-+/, "");
        }

        if (schema[sortProp]) {
          sortStr += sortProp + " " + sortDirection + ",";
        }
      });
    }
  }

  if (sortStr) {
    sortStr = sortStr.slice(0, -1); //delete last ','
  } else {
    sortStr = defaultSortStr;
  }

  //offset 0 ROWS FETCH NEXT 10 ROWS ONLY;
  paginationStr +=
    " " +
    sortStr +
    " OFFSET " +
    skip +
    " ROWS FETCH NEXT " +
    pageSize +
    " ROWS ONLY";

  // console.log('sortStr', sortStr);
  // console.log('paginationStr', paginationStr);

  return {
    filterStr,
    paginationStr,
  };
};

exports.getInsertQuery = (schema, request, insert) => {
  if (!insert) {
    throw new Error("Invalid insert param");
  }

  let insertFieldNamesStr = "";
  let insertValuesStr = "";

  for (let fieldName in schema) {
    const schemaProp = schema[fieldName];
    let val = insert[fieldName];
    let { isValid, err } = schemaProp.validate(val);
    if (isValid) {
      if (val !== null && val !== undefined) {
        request.input(fieldName, schemaProp.sqlType, val);
        insertFieldNamesStr += fieldName + ",";
        insertValuesStr += "@" + fieldName + ",";
      }
    } else {
      throw new Error("Invalid data at field: " + fieldName + ". " + err);
    }
  }

  if (insertFieldNamesStr && insertValuesStr) {
    insertFieldNamesStr = insertFieldNamesStr.slice(0, -1); //delete last ','
    insertValuesStr = insertValuesStr.slice(0, -1); //delete last ','
  }

  return {
    request,
    insertFieldNamesStr,
    insertValuesStr,
  };
};

exports.getUpdateQuery = (schema, request, update) => {
  if (!update) {
    throw new Error("Invalid update param");
  }

  let updateStr = "";
  for (let fieldName in update) {
    const schemaProp = schema[fieldName];
    if (schemaProp) {
      let val = update[fieldName];
      let { isValid, err } = schemaProp.validate(val);
      if (isValid) {
        if (val !== null && val !== undefined) {
          request.input(fieldName, schemaProp.sqlType, val);
          updateStr += fieldName + " = @" + fieldName + ",";
        }
      } else {
        throw new Error("Invalid data at field: " + fieldName + ". " + err);
      }
    }
  }

  if (updateStr) {
    updateStr = updateStr.slice(0, -1); //delete last ','
  }

  return {
    request,
    updateStr,
  };
};

exports.getFilterProductsQuery = (
  schema,
  filter,
  page,
  pageSize,
  defaultSort
) => {
  let filterStr;
  let paginationStr;

  console.log(filter);
  const skip = (page - 1) * pageSize;
  paginationStr = "order by";
  let sort = "";
  if (filter.sort) {
    sort = filter.sort;
  }

  delete filter.page;
  delete filter.pageSize;
  delete filter.sort;

  if (filter) {
    filterStr = "";
    let i = 0;
    for (let criteria in filter) {
      const schemaProp = schema[criteria];
      if (schema[criteria]) {
        if (i > 0) {
          filterStr += " AND ";
        } else {
          filterStr += " WHERE ";
        }

        if (schemaProp.type === "number") {
          if (typeof filter[criteria] === "object") {
            let j = 0;
            for (let criteriaOperator in filter[criteria]) {
              let operator;
              let criterialVal;

              if (criteriaOperator === "gte") {
                operator = ">=";
                criterialVal = filter[criteria]["gte"];
              } else if (criteriaOperator === "lt") {
                operator = "<";
                criterialVal = filter[criteria]["lt"];
              } else if (criteriaOperator === "eq") {
                operator = "=";
                criterialVal = filter[criteria]["eq"];
              }

              if (operator && criterialVal) {
                if (j > 0) {
                  filterStr += " AND ";
                }
                filterStr += criteria + " " + operator + " " + criterialVal;
                j++;
                console.log(filterStr);
              }
              i++;
              console.log(filterStr);
            }
          }
        }

        //filter brand
        if (criteria == "brand") {
          filterStr += "(";
          if (filter[criteria].constructor === Array) {
            if (schemaProp.type === "string") {
              for (let valueIdx in filter[criteria]) {
                filterStr +=
                  criteria + " = '" + filter[criteria][valueIdx] + "'";
                if (valueIdx * 1 === filter[criteria].length - 1) {
                  filterStr += ")";
                } else if (valueIdx * 1 !== filter[criteria].length - 1) {
                  filterStr += " or ";
                }
              }
            }
            i++;
          }
          if (
            filter[criteria].constructor !== Array &&
            schemaProp.type === "string"
          ) {
            filterStr += criteria + "='" + filter[criteria] + "')";
            console.log(filterStr);
            i++;
          }
        }
        //filter category
        if (criteria == "category") {
          filterStr += "(";
          if (filter[criteria].constructor === Array) {
            if (schemaProp.type === "string") {
              for (let valueIdx in filter[criteria]) {
                filterStr +=
                  criteria + " = '" + filter[criteria][valueIdx] + "'";
                if (valueIdx * 1 === filter[criteria].length - 1) {
                  filterStr += ")";
                } else if (valueIdx * 1 !== filter[criteria].length - 1) {
                  filterStr += " or ";
                }
              }
            }
            i++;
          }
          if (
            filter[criteria].constructor !== Array &&
            schemaProp.type === "string"
          ) {
            filterStr += criteria + "='" + filter[criteria] + "')";
            console.log(filterStr);
            i++;
          }
        }
        //filter name
        if (criteria == "name" && filter[criteria].length > 0) {
          filterStr += criteria + " like '%" + filter[criteria] + "%' ";
          i++;
        }
      }
    }
    if (sort.length == 0) {
      paginationStr +=
        "(SELECT NULL) OFFSET " +
        skip +
        " ROWS FETCH NEXT " +
        pageSize +
        " ROWS ONLY";
    } else if (sort.length > 0) {
      paginationStr += ` price ${sort}`;
      paginationStr +=
        " OFFSET " + skip + " ROWS FETCH NEXT " + pageSize + " ROWS ONLY";
    }
  }
  console.log("filter string", filterStr);
  filterStr = filterStr.replace(/[\n\r]/g, "");
  return { filterStr, paginationStr };
};
