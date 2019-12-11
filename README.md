## Overview
Uses Atlassian REST API v2 to collect Jira issues by querying your remote Jira for all issues updated in the last 2 minutes (default).

The basic premise is that Jira Issues will contain new information, like status change, new assignees, or new issues created. That's why this add-on uses the JQL (Jira Query Language) logic "get all issues updated in the last 2 minutes", which runs every 2 minutes. It then parses the JSON response from the REST API and looks for the field "updated", (found in the JSON path issues[\*].fields.updated) to set the event's _time. Each array element in the issues[\*] array list is an event. This is equivalent to saying each issue is an event. Hence, it is important to dedup your events by key or id.

It is important to note that one must use a service / global account found in the configure page. Enter the the username of the service account and API Token for password. To know more about API Tokens of Atlassian, visit https://confluence.atlassian.com/cloud/api-tokens-938839638.html

JQL in this add-on can be changed. It is defaulted to "updated > -2m" but the actual value is its URL-encoded equivalent, i.e. "updated+%3E+-2m". If you wish to change the JQL, which is doable during setup of a new input, make sure that the interval is relative to the JQL. For example, if you want to modify it to the logic "all issues updated within the last 15 minutes", you have to change the interval to 900 (seconds or 15 minutes).

Learn more about Atlassian REST API v2: https://developer.atlassian.com/cloud/jira/platform/rest/v2/ 

Learn more about JQL: https://confluence.atlassian.com/jirasoftwarecloud/advanced-searching-764478330.html 

Convert JQL to URL-encoded: https://www.url-encode-decode.com/ 

### Splunkbase
[Jira Issues Collector](https://splunkbase.splunk.com/app/4814/)
 
--- 
 
##### Copyright © 2019 Intalock Technologies Pty Ltd. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
