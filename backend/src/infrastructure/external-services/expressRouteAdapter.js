// src/infrastructure/adapters/expressRouteAdapter.js

const adaptRoute = (controller) => {
    return async (req, res) => {
        try {
            await controller(req, res);
        } catch (error) {
            console.error('Route Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};

module.exports = { adaptRoute };