/**
 * HubSpot Forms API Integration
 * Submits lead data directly to HubSpot CRM.
 */

export interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: 'contact_form' | 'voice_agent' | 'community_modal';
}

export async function submitToHubSpot(data: LeadSubmission): Promise<{ success: boolean; error?: string }> {
  const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID || 'PORTAL_ID_PENDING';
  const formId = import.meta.env.VITE_HUBSPOT_FORM_ID || 'FORM_ID_PENDING';

  // If IDs haven't been provided by the user yet, log cleanly in development
  if (portalId === 'PORTAL_ID_PENDING' || formId === 'FORM_ID_PENDING') {
    console.info('[HubSpot CRM Staging] Lead submission payload ready for HubSpot:', data);
    // Return success in preview/dev mode until the live portal IDs are dropped in
    return { success: true };
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  // Split name into first and last name if possible
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const fields = [
    { name: 'firstname', value: firstName },
    { name: 'lastname', value: lastName },
    { name: 'email', value: data.email },
  ];

  if (data.phone) {
    fields.push({ name: 'phone', value: data.phone });
  }

  if (data.service) {
    fields.push({ name: 'service_interest', value: data.service });
  }

  if (data.message) {
    fields.push({ name: 'message', value: data.message });
  }

  if (data.source) {
    fields.push({ name: 'lead_source', value: data.source });
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[HubSpot Submission Error]', errorData);
      return { success: false, error: 'Submission failed. Please try again or reach out directly.' };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[HubSpot Network Error]', err);
    return { success: false, error: 'Network error connecting to CRM. Please try again.' };
  }
}
