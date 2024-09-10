/**
 * Defines the various roles within the system.
 * 
 * @constant
 * @type {Object}
 * @property {string} SuperAdmin - Represents a super administrator with the highest level of access.
 * @property {string} Admin - Represents an administrator with high-level access.
 * @property {string} User - Represents a regular user with standard access.
 * @property {string} DeliveryMan - Represents a delivery person with specific role-related access.
 * @property {string} FakeAdmin - Represents a placeholder or mock admin role.
 */
const systemRoles = {
  SuperAdmin: "SuperAdmin",     // Highest level of access
  Admin: "Admin",                // High-level access
  User: "User",                  // Standard user access
  DeliveryMan: "DeliveryMan",   // Role for delivery personnel
  FakeAdmin: "FakeAdmin"        // Placeholder role for testing or mock purposes
};

export default systemRoles;
