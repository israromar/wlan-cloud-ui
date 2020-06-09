import gql from 'graphql-tag';

export const GET_ALL_LOCATIONS = gql`
  query GetAllLocations($customerId: Int!) {
    getAllLocations(customerId: $customerId) {
      id
      name
      parentId
    }
  }
`;

export const FILTER_EQUIPMENT = gql`
  query FilterEquipment(
    $locationIds: [Int]
    $customerId: Int!
    $equipmentType: String
    $cursor: String
  ) {
    filterEquipment(
      customerId: $customerId
      locationIds: $locationIds
      equipmentType: $equipmentType
      cursor: $cursor
    ) {
      items {
        name
        id
        locationId
        profileId
        inventoryId
        channel
        profile {
          name
        }
        status {
          protocol {
            details {
              reportedIpV4Addr
              reportedMacAddr
            }
          }
          osPerformance {
            details {
              uptimeInSeconds
            }
          }
          radioUtilization {
            details {
              reportedIpV4Addr
              capacityDetails
              noiseFloorDetails
            }
          }
        }
      }
      context {
        lastPage
        cursor
      }
    }
  }
`;

export const GET_LOCATION = gql`
  query GetLocation($id: Int!) {
    getLocation(id: $id) {
      id
      parentId
      name
      locationType
      lastModifiedTimestamp
    }
  }
`;

export const DELETE_LOCATION = gql`
  query DeleteLocation($id: Int!) {
    deleteLocation(id: $id) {
      id
    }
  }
`;
