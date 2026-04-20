import { apiRequest } from "./index";
 
export interface EventPayload {
  topic: string;
  event_date: string;
  event_time: string;
  end_event_date?: string;
  end_event_time?: string;
  meeting_link?: string;
  duration?: string;
  summary?: string;
  job_titles?: string[];
  job_positions?: string[];
  target_locations?: string[];
  zoom_webinar_id?: string;
  prompt_first_time?: string;
  thank_you_attendee_template?: string;
}
 
const headers = {
  "Content-Type": "application/json",
  "x-api-key": "AICERTS@123",
};
 
const BASE_URL = process.env.NEXT_PUBLIC_EVENTS_API_URL;
 
// ✅ CREATE
const createEvent = async (data: EventPayload) =>
  apiRequest({
    method: "POST",
    url: `${BASE_URL}api/events`, // ✅ FIXED
    data,
    headers,
  });
 
// ✅ GET
const getEvents = async (page = 1) =>
  apiRequest({
    method: "GET",
    url: `${BASE_URL}api/events?page=${page}`, // 👈 added page
    headers,
  });
 
  const getEventDetails = async (id: number) =>
  apiRequest({
    method: "GET",
    url: `${BASE_URL}api/events/${id}`,
    headers,
  });
 
// ✅ DELETE
const deleteEvent = async (id: string) =>
  apiRequest({
    method: "DELETE",
    url: `${BASE_URL}api/events/${id}`, // ✅ FIXED
    headers,
  });
 
// ✅ UPDATE
const updateEvent = async (id: string, data: EventPayload) =>
  apiRequest({
    method: "PUT",
    url: `${BASE_URL}api/events/${id}`, // ✅ FIXED
    data,
    headers,
  });
 
export { createEvent, getEvents, deleteEvent, updateEvent, getEventDetails };
 