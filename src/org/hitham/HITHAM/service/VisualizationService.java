package org.hitham.HITHAM.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import org.hitham.HITHAM.database.Convertor;
import org.hitham.HITHAM.database.DatabaseConnection;
import org.json.JSONArray;

public class VisualizationService {
public JSONArray fetchSongTimeline(String song_id, String student_id, String period) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
int stu_id = Integer.parseInt(student_id);
int sng_id = Integer.parseInt(song_id);
int prd = Integer.parseInt(period);
System.out.println("period is " + prd);
String query = "SELECT student_activity_type,student_activity_time FROM student_activity where student_pk="
+ stu_id + " AND recording_id=" + sng_id + "";
if (prd == 1000)
query = "SELECT student_activity_type,student_activity_time FROM student_activity where student_pk="
+ stu_id + " AND recording_id=" + sng_id
+ " AND student_activity_timestamp >= DATE_ADD(CURRENT_DATE, INTERVAL -1 DAY)";
else if (prd == 30000)
query = "SELECT student_activity_type,student_activity_time FROM student_activity where student_pk="
+ stu_id + " AND recording_id=" + sng_id
+ " AND student_activity_timestamp >= DATE_ADD(CURRENT_DATE, INTERVAL -1 MONTH)";
else if (prd == 7000)
query = "SELECT student_activity_type,student_activity_time FROM student_activity where student_pk="
+ stu_id + " AND recording_id=" + sng_id
+ " AND student_activity_timestamp >= DATE_ADD(CURRENT_DATE, INTERVAL -7 DAY)";
System.out.println(query);
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
int[] arr = new int[505];
int[] chunks = new int[505];
for (int i = 0; i < 500; i++) {
arr[i] = 0;
chunks[i] = 0;
}
int begin;
int curr;
int prev = 0;
int cnt = 0;
int sum = 0;
while (rs.next()) {
String type = rs.getString("student_activity_type");
if (type.equals("PLAY")) {
begin = rs.getInt("student_activity_time");
prev = begin;
cnt++;
} else if (type.equals("PAUSED")) {
curr = rs.getInt("student_activity_time");
System.out.print("Chunk is of " + (curr - prev));
if (curr - prev < 5)
chunks[5]++;
else if (curr - prev < 10)
chunks[10]++;
else if (curr - prev < 15)
chunks[15]++;
else if (curr - prev < 25)
chunks[25]++;
else
chunks[30]++;
sum += curr - prev;
for (int i = prev + 1; i <= curr; i++) {
arr[i]++;
}
prev = curr;
} else if (type.equals("CONTINUE")) {
curr = rs.getInt("student_activity_time");
System.out.print("Chunk is of " + (curr - prev));
if (curr - prev < 5)
chunks[5]++;
else if (curr - prev < 10)
chunks[10]++;
else if (curr - prev < 15)
chunks[15]++;
else if (curr - prev < 25)
chunks[25]++;
else
chunks[30]++;
prev = curr;
} else {
curr = rs.getInt("student_activity_time");
System.out.print("Chunk is of " + (curr - prev));
if (curr - prev < 5)
chunks[5]++;
else if (curr - prev < 10)
chunks[10]++;
else if (curr - prev < 15)
chunks[15]++;
else if (curr - prev < 25)
chunks[25]++;
else
chunks[30]++;
sum += curr - prev;
for (int i = prev + 1; i <= curr; i++) {
arr[i]++;
}
prev = curr;
}
}
String res = "[{\"x0\":" + arr[0] + ",";
StringBuffer ans = new StringBuffer(res);
for (int i = 1; i <= 499; i++) {
String s = "\"x" + i + "\":" + arr[i] + ",";
ans.append(s);
}
ans.append("\"x500\":" + arr[500] + ",");
String s = "\"y" + 5 + "\":" + chunks[5] + ",";
ans.append(s);
s = "\"y" + 10 + "\":" + chunks[10] + ",";
ans.append(s);
s = "\"y" + 15 + "\":" + chunks[15] + ",";
ans.append(s);
s = "\"y" + 25 + "\":" + chunks[25] + ",";
ans.append(s);
s = "\"y" + 30 + "\":" + chunks[30] + ",";
ans.append(s);
ans.append("\"totaltime\":" + sum + ",");
ans.append("\"Count\":" + cnt + "}]");
System.out.println(ans);
JSONArray result = new JSONArray(ans.toString());
System.out.println(result);
dbconn.closeAll();
System.out.println(result);
return result;
} catch (Exception e) {
// System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}

public JSONArray fetchMostPlayedSong(String student_id) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
int stu_id = Integer.parseInt(student_id);
// String query = "select * from recording where recording_status = 'active' and
// recording_id not in (select recording_id from recording_playlist_mapping
// where recording_playlist_mapping_status = 'active' and playlist_id =
// "+id+")";
String query = "SELECT r.recording_name,r.recording_id,COUNT(*) count from student_activity a,recording r,song s  where student_pk="
+ stu_id
+ " AND student_activity_type='PLAY' AND r.recording_id=a.recording_id AND s.song_id=r.song_id GROUP BY r.recording_id order by count desc";
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
JSONArray result = Convertor.convertToJSON(rs);
dbconn.closeAll();
return result;
} catch (Exception e) {
System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}

public JSONArray fetchListeningPattern(String student_id,String song_id) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
int stu_id = Integer.parseInt(student_id);
// String query="SELECT student_activity_type,student_activity_time,recording_id
// FROM student_activity where student_pk="+stu_id+"";
String query = "SELECT student_activity_type ,student_activity_time,song_name,recording_name FROM student_activity a,recording r,song s where student_pk="
+ stu_id + " AND a.recording_id=r.recording_id AND r.song_id=s.song_id and r.recording_id="+song_id;
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
int[] chunks = new int[505];
for (int i = 0; i < 500; i++) {
chunks[i] = 0;
}
int begin = 0;
int curr;
int prev = 0;
int cnt = 0;
int sum = 0;
while (rs.next()) {
String type = rs.getString("student_activity_type");
int a = 0;
if (type.equals("PLAY")) {
begin = rs.getInt("student_activity_time");
prev = begin;
cnt++;
} else if (type.equals("PAUSED")) {
curr = rs.getInt("student_activity_time");
System.out.print("Chunk is of " + (curr - prev));
if (curr - prev < 5) {
chunks[0]++;
chunks[6]--;
} else if (curr - prev < 10) {
chunks[6]++;
chunks[11]--;
} else if (curr - prev < 15) {
chunks[11]++;
chunks[16]--;
} else if (curr - prev < 25) {
chunks[16]++;
chunks[26]--;
} else {
chunks[30]++;
}
sum += curr - prev;
prev = curr;
} else if (type.equals("CONTINUE")) {
curr = rs.getInt("student_activity_time");
System.out.print("Chunk is of " + (curr - prev));
if (curr - prev < 5)
chunks[5]++;
else if (curr - prev < 10)
chunks[10]++;
else if (curr - prev < 15)
chunks[15]++;
else if (curr - prev < 25)
chunks[25]++;
else
chunks[30]++;
prev = curr;
} else {
curr = rs.getInt("student_activity_time");
System.out.print("Chunk is of " + (curr - prev));
if (curr - prev < 5) {
chunks[0]++;
chunks[6]--;
} else if (curr - prev < 10) {
chunks[6]++;
chunks[11]--;
} else if (curr - prev < 15) {
chunks[11]++;
chunks[16]--;
} else if (curr - prev < 25) {
chunks[16]++;
chunks[26]--;
} else {
chunks[30]++;
}
sum += curr - prev;
prev = curr;
}
}
for (int i = 1; i <= 500; i++) {
chunks[i] += chunks[i - 1];
}
String res = "[{\"x0\":" + chunks[0] + ",";
StringBuffer ans = new StringBuffer(res);
for (int i = 1; i <= 30; i++) {
String s = "\"x" + i + "\":" + chunks[i] + ",";
ans.append(s);
}
ans.append("\"x31\":" + chunks[31] + "}]");
System.out.println(ans);
JSONArray result = new JSONArray(ans.toString());
System.out.println(result);
dbconn.closeAll();
System.out.println(result);
return result;
} catch (Exception e) {
// System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}

public JSONArray fetchAllRagas(String tid) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
// int stu_id=Integer.parseInt(student_id);
// String query = "select * from recording where recording_status = 'active' and
// recording_id not in (select recording_id from recording_playlist_mapping
// where recording_playlist_mapping_status = 'active' and playlist_id =
// "+id+")";
String query = "select s.song_raaga,COUNT(*)count from song s,recording r,student_activity a,teacher_student_mapping t where s.song_id=r.song_id AND r.recording_id=a.recording_id AND t.student_pk=a.student_pk and student_activity_type='PLAY' and teacher_pk="+tid+" GROUP BY song_raaga\r\n ORDER BY count DESC";
// String query="SELECT song_name,r.recording_id,COUNT(*) count from
// student_activity a,recording r,song s where student_pk="+stu_id+" AND
// student_activity_type='PLAY' AND r.recording_id=a.recording_id AND
// s.song_id=r.song_id GROUP BY s.song_id";
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
JSONArray result = Convertor.convertToJSON(rs);
dbconn.closeAll();
return result;
} catch (Exception e) {
System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}

public JSONArray fetchAllTaals(String tid) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
// int stu_id=Integer.parseInt(student_id);
// String query = "select * from recording where recording_status = 'active' and
// recording_id not in (select recording_id from recording_playlist_mapping
// where recording_playlist_mapping_status = 'active' and playlist_id =
// "+id+")";
//String query = "select s.song_taal,COUNT(*)count from song s,recording r,student_activity a,teacher_student_mapping t where s.song_id=r.song_id AND r.recording_id=a.recording_id AND t.student_pk=a.student_pk and student_activity_type='PLAY' and t.teacher_pk=a.student_pk GROUP BY song_raaga\r\n ORDER BY count DESC";
String query = "select s.song_taal,COUNT(*)count from song s,recording r,student_activity a,teacher_student_mapping t where s.song_id=r.song_id AND r.recording_id=a.recording_id AND t.student_pk=a.student_pk and student_activity_type='PLAY' and teacher_pk="+tid+" GROUP BY song_taal\r\n ORDER BY count DESC ";
// String query="select student_name,song_name,count(*)count from song
// g,recording r,student s,student_activity a where g.song_id=r.song_id and
// r.recording_id=a.recording_id and s.student_pk=a.student_pk and
// student_activity_type='PLAY' and g.song_id="+sng_id+" AND
// s.student_pk="+stu_id;
// String query="SELECT song_name,r.recording_id,COUNT(*) count from
// student_activity a,recording r,song s where student_pk="+stu_id+" AND
// student_activity_type='PLAY' AND r.recording_id=a.recording_id AND
// s.song_id=r.song_id GROUP BY s.song_id";
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
JSONArray result = Convertor.convertToJSON(rs);
dbconn.closeAll();
return result;
} catch (Exception e) {
System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}

public JSONArray heatmap(String student_id, String song_id) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
int stu_id = Integer.parseInt(student_id);
int sng_id = Integer.parseInt(song_id);
String query = "select student_name,song_name,count(*)count from song g,recording r,student s,student_activity a where g.song_id=r.song_id and r.recording_id=a.recording_id and s.student_pk=a.student_pk and student_activity_type='PLAY' and g.song_id="
+ sng_id + " AND s.student_pk=" + stu_id;
// String query="select student_name,song_name,count(*)count from song
// g,recording r,student s,student_activity a where g.song_id=r.song_id and
// r.recording_id=a.recording_id and student_activity_type='PLAY' and
// s.student_pk="+stu_id+" and g.song_id="+sng_id+" GROUP BY
// s.student_pk,r.song_id";
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
JSONArray result = Convertor.convertToJSON(rs);
dbconn.closeAll();
return result;
} catch (Exception e) {
System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}

public JSONArray fetchAllSongs(String raaga,String tid) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
String query = "select song_name,count(*)count from song g,recording r,student_activity a,teacher_student_mapping t where g.song_id=r.song_id and r.recording_id=a.recording_id and t.student_pk=a.student_pk and student_activity_type='PLAY' and t.teacher_pk="+tid+" and song_raaga='"+ raaga + "' GROUP BY song_name";
// String query="select student_name,song_name,count(*)count from song
// g,recording r,student s,student_activity a where g.song_id=r.song_id and
// r.recording_id=a.recording_id and student_activity_type='PLAY' and
// s.student_pk="+stu_id+" and g.song_id="+sng_id+" GROUP BY
// s.student_pk,r.song_id";
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
JSONArray result = Convertor.convertToJSON(rs);
dbconn.closeAll();
return result;
} catch (Exception e) {
System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}

public JSONArray fetchAllTaalSongs(String taal,String tid) throws SQLException {
// TODO Auto-generated method stub
DatabaseConnection dbconn = new DatabaseConnection();
if (!dbconn.isStatus()) {
dbconn.closeAll();
return null;
}
// String query = "select song_name,count(*)count from song g,recording r,student_activity a where g.song_id=r.song_id and teacher_pk="+tid+"  and r.recording_id=a.recording_id and student_activity_type='PLAY' and song_taal='"
// + taal + "' GROUP BY song_name";
String query = "select song_name,count(*)count from song g,recording r,student_activity a,teacher_student_mapping t where g.song_id=r.song_id and r.recording_id=a.recording_id and t.student_pk=a.student_pk and student_activity_type='PLAY' and t.teacher_pk="+tid+" and song_taal='"+ taal + "' GROUP BY song_name";
// String query="select student_name,song_name,count(*)count from song
// g,recording r,student s,student_activity a where g.song_id=r.song_id and
// r.recording_id=a.recording_id and student_activity_type='PLAY' and
// s.student_pk="+stu_id+" and g.song_id="+sng_id+" GROUP BY
// s.student_pk,r.song_id";
try {
ResultSet rs = dbconn.getStmt().executeQuery(query);
JSONArray result = Convertor.convertToJSON(rs);
dbconn.closeAll();
return result;
} catch (Exception e) {
System.out.println("Exception in fetchList of recording ");
System.out.println(e.getMessage());
dbconn.closeAll();
return null;
}
}
}

