const testData = [
    {
        "source": "Salary",
        "target": "Household Income",
        "value": 4500
    },
    {
        "source": "Freelance Work",
        "target": "Household Income",
        "value": 1200
    },
    {
        "source": "Investments",
        "target": "Household Income",
        "value": 300
    },
    {
        "source": "Side Hustle",
        "target": "Household Income",
        "value": 800
    },

    // Layer 2: Major Budget Categories
    {
        "source": "Household Income",
        "target": "Living Expenses",
        "value": 3000
    },
    {
        "source": "Household Income",
        "target": "Savings & Investments",
        "value": 1500
    },
    {
        "source": "Household Income",
        "target": "Discretionary Spending",
        "value": 1800
    },
    {
        "source": "Household Income",
        "target": "Debt Repayment",
        "value": 500
    },

    // Layer 3: Sub-categories of Living Expenses
    {
        "source": "Living Expenses",
        "target": "Rent/Mortgage",
        "value": 1500
    },
    {
        "source": "Living Expenses",
        "target": "Utilities",
        "value": 400
    },
    {
        "source": "Living Expenses",
        "target": "Groceries",
        "value": 600
    },
    {
        "source": "Living Expenses",
        "target": "Transportation",
        "value": 500
    },

    // Layer 4: Sub-categories of Discretionary Spending
    {
        "source": "Discretionary Spending",
        "target": "Entertainment",
        "value": 700
    },
    {
        "source": "Discretionary Spending",
        "target": "Dining Out",
        "value": 500
    },
    {
        "source": "Discretionary Spending",
        "target": "Shopping",
        "value": 600
    },

    // Layer 5: Further breakdowns and cross-flows
    {
        "source": "Entertainment",
        "target": "Vacation Fund",
        "value": 200
    },
    {
        "source": "Dining Out",
        "target": "Groceries", // Interweaving flow for a more complex chart
        "value": 100
    },
    {
        "source": "Savings & Investments",
        "target": "Retirement Fund",
        "value": 1000
    },
    {
        "source": "Savings & Investments",
        "target": "Emergency Fund",
        "value": 500
    },

    // Layer 6: Final Destinations
    {
        "source": "Retirement Fund",
        "target": "Long-Term Assets",
        "value": 1000
    },
    {
        "source": "Emergency Fund",
        "target": "Liquid Assets",
        "value": 500
    },
    {
        "source": "Debt Repayment",
        "target": "Financial Freedom",
        "value": 500
    },
    {
        "source": "Shopping",
        "target": "Personal Care",
        "value": 200
    },
    {
        "source": "Shopping",
        "target": "Hobbies",
        "value": 400
    },
    {
        "source": "Freelance Work",
        "target": "Business Expenses", // Direct flow from source to a final sink
        "value": 200
    }
];