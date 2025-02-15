export default function calculateTax (income, investments, deductions, otherIncome) {
  const totalIncome = parseFloat(income) + parseFloat(otherIncome);
  const taxableIncome = totalIncome - (parseFloat(investments) + parseFloat(deductions));

  let taxPayable = 0;
  if (taxableIncome <= 250000) taxPayable = 0;
  else if (taxableIncome <= 500000) taxPayable = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 1000000) taxPayable = 12500 + (taxableIncome - 500000) * 0.2;
  else taxPayable = 112500 + (taxableIncome - 1000000) * 0.3;

  return { taxableIncome, taxPayable };
};