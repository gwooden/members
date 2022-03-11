<cfcomponent>
	<cffunction name="init"
				access="public"
				returntype="component"
				output="false"
				displayname=""
				hint=""
				description="">
		
		<cfreturn this>
	</cffunction>
    
	<cffunction name="getMembers"
				access="remote"
				returntype="string"
				output="false"
				returnformat="JSON">

		<cfargument name="searchName"
				required="false"
				type="string"
				default="">

		<cfargument name="stateName"
				required="false"
				type="string"
				default="">

		<cfargument name="orderBy"
				required="false"
				type="string"
				default="last ASC, first ASC">
		
		<cfset local.dataSource = "example_database">
		<cfset local.returnContent = "">
		<cftry>
			<CFQUERY DATASOURCE="#local.dataSource#" NAME="local.members">
				SELECT id,title,first,last,chamber,party,legstate,district
				FROM congress_members
				WHERE 1=1
				<cfif len(trim(arguments.searchName)) neq 0>
					AND 
						(
							first LIKE (<cfqueryparam cfsqltype="cf_sql_varchar" value="%#arguments.searchName#%">)
							OR
							last LIKE (<cfqueryparam cfsqltype="cf_sql_varchar" value="%#arguments.searchName#%">)
						)
				</cfif>
				<cfif len(trim(arguments.stateName)) neq 0>
					AND 
						(
							legstate = <cfqueryparam cfsqltype="cf_sql_varchar" value="#arguments.stateName#">
						)
				</cfif>
				ORDER BY #arguments.orderBy#
			</CFQUERY>
			<cfset local.returnContent = SerializeJSON(local.members,"struct")>
			<cfcatch></cfcatch>
		</cftry>
		<cfreturn local.returnContent>
	</cffunction>

	<cffunction name="add"
				access="private"
				returntype="string"
				output="false">
		
		<cfargument name="insertData"
				required="yes"
				type="struct">

		
		<CFQUERY DATASOURCE="#variables.dataSource#" NAME="members">
			INSERT INTO congress_members(
				Title,
				First,
				Last,
				Chamber,
				Party,
				LegState,
				District
			)
			VALUES(
				<cfqueryparam CFSQLType="CF_SQL_VARCHAR" value="#insertData.Title#">,
				<cfqueryparam CFSQLType="CF_SQL_VARCHAR" value="#insertData.First#">,
				<cfqueryparam CFSQLType="CF_SQL_VARCHAR" value="#insertData.Last#">,
				<cfqueryparam CFSQLType="CF_SQL_VARCHAR" value="#insertData.Chamber#">,
				<cfqueryparam CFSQLType="CF_SQL_VARCHAR" value="#insertData.Party#">,
				<cfqueryparam CFSQLType="CF_SQL_VARCHAR" value="#insertData.LegState#">,
				<cfqueryparam CFSQLType="CF_SQL_INTEGER" value="#insertData.District#">
			)
		</CFQUERY>
		
		<cfreturn "complete">
	</cffunction>
</cfcomponent>