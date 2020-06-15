import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Alert, Spin } from 'antd';
import { OS_STATS_DATA } from 'constants/index';

import { AccessPointDetails as AccessPointDetailsPage } from '@tip-wlan/wlan-cloud-ui-library';

const GET_EQUIPMENT = gql`
  query GetEquipment($id: Int!) {
    getEquipment(id: $id) {
      name
      locationId
      serial
      inventoryId
      details
      profile {
        name
        childProfiles {
          id
          name
          details
        }
      }
      status {
        protocol {
          detailsJSON
          details {
            reportedMacAddr
          }
        }
        radioUtilization {
          detailsJSON
        }
        clientDetails {
          detailsJSON
        }
        osPerformance {
          detailsJSON
        }
      }
    }
  }
`;

const AccessPointDetails = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_EQUIPMENT, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return (
      <Alert message="Error" description="Failed to load profile data." type="error" showIcon />
    );
  }

  const refetchData = () => {
    refetch();
  };

  return (
    <AccessPointDetailsPage
      data={data.getEquipment}
      osData={OS_STATS_DATA}
      handleRefetch={refetchData}
    />
  );
};

export default AccessPointDetails;
