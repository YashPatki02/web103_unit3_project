const getAllLocations = async () => {
    const response = await fetch("http://localhost:3000/api/locations");
    const data = await response.json();

    return data;
};

const getLocationById = async (locationId) => {
    const response = await fetch(
        `http://localhost:3000/api/locations/${locationId}`
    );
    const data = await response.json();

    return data;
};

export default {
    getAllLocations,
    getLocationById,
};
