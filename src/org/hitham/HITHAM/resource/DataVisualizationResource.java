package org.hitham.HITHAM.resource;

import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.hitham.HITHAM.model.PlayListModel;
import org.hitham.HITHAM.service.PlaylistService;
import org.hitham.HITHAM.service.VisualizationService;
import org.json.JSONArray;

@Path("visualize")
public class DataVisualizationResource {
@POST
@Path("/SongTimelineChart/{song_id}/{student_id}/{period}")
@Produces(MediaType.APPLICATION_JSON)
public Response SongTimeLineChart(@PathParam("song_id") String song_id, @PathParam("student_id") String student_id,
@PathParam("period") String period) throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.fetchSongTimeline(song_id, student_id, period);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}

@POST
@Path("/StudentListeningPattern/{student_id}/{song_id}")
@Produces(MediaType.APPLICATION_JSON)
public Response StudentListeningPattern(@PathParam("student_id") String student_id,@PathParam("song_id") String song_id) throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.fetchListeningPattern(student_id,song_id);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}

@POST
@Path("/MostPlayedSong/{student_id}")
@Produces(MediaType.APPLICATION_JSON)
public Response MostPlayedSong(@PathParam("student_id") String student_id) throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.fetchMostPlayedSong(student_id);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}

@POST
@Path("/fetchAllRagas/{teacher_id}")
@Produces(MediaType.APPLICATION_JSON)
public Response fetchAllRagas(@PathParam("teacher_id")String tid) throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.fetchAllRagas(tid);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}

@POST
@Path("/fetchAllTaals/{teacher_id}")
@Produces(MediaType.APPLICATION_JSON)
public Response fetchAllTaals(@PathParam("teacher_id")String tid) throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.fetchAllTaals(tid);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}

@POST
@Path("/heatmap/{student_id}/{song_id}")
@Produces(MediaType.APPLICATION_JSON)
public Response heatmap(@PathParam("student_id") String student_id, @PathParam("song_id") String song_id)
throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.heatmap(student_id, song_id);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}

@POST
@Path("/fetchAllSongs/{raaga}/{teacher_id}")
@Produces(MediaType.APPLICATION_JSON)
public Response fetchAllTaals(@PathParam("raaga") String raaga,@PathParam("teacher_id") String tid) throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.fetchAllSongs(raaga,tid);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}

@POST
@Path("/fetchAllTaalSongs/{taal}/{teacher_id}")
@Produces(MediaType.APPLICATION_JSON)
public Response fetchAllTaalSongs(@PathParam("taal") String taal,@PathParam("teacher_id") String tid) throws SQLException {
VisualizationService pls = new VisualizationService();
JSONArray result = pls.fetchAllTaalSongs(taal,tid);
if (result != null)
try {
return Response.status(201).entity(result.toString()).build();
} catch (Exception e) {
// TODO Auto-generated catch block
e.printStackTrace();
}
else
return Response.status(500).build();
return Response.status(500).build();
}
}
