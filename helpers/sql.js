const { BadRequestError } = require("../ExpressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  /**
   * This function takes to args:
   * -  an object containing the key values pairs for data to update,
   *  - and the tranlation from the object key to the SQL table column
   * First, check if there is any data provided to update, if not error
   * Second, create an array "cols", which contains string SQL table column names = index ($1, %$2 ..etc)
   * third, return an object where setCols = a string of comma separated SQL column names (for UPDATE query)
   * and values = the values provided.
   * This object can then be deconstructed to insert values into update query:
   *  - setCols will be used - in "SET ${setCols} "
   *  - the length of the values + 1 is the $idx for the comany to update (last in var array)
   *  - ...values will be the first part of the var array and will match the $idx in setCols
   * this allows for only the needed data to be updated instead of the entire company or user
   */
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
